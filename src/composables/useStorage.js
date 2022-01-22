import { ref, watchEffect } from 'vue'
import { storage, db } from '../firebase/config'
import { ref as bucketRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const useStorage = (file) => {
  const error = ref(null)
  const url = ref(null)
  const progress = ref(null)

  watchEffect(() => {
    
    // references
    const storageRef = bucketRef(storage, 'images/' + file.name)
    const colRef = collection(db, 'images')

    // upload file
    const uploadTask = uploadBytesResumable(storageRef, file)
    
    uploadTask.on('state_changed', (snap) => {
      // update the progress as file uploads
      progress.value = (snap.bytesTransferred / snap.totalBytes) * 100
      console.log(snap)
      console.log('Upload is ' + progress.value + '% done')
    },
    (err) => {
      error.value = err
    },
    async () => {
      // get the download url & make firestore doc
      const dlUrl = await getDownloadURL(uploadTask.snapshot.ref)
      //const createdAt = timestamp()
      console.log('File is available at', dlUrl)
      await addDoc(colRef, {
        url: dlUrl,
        createdAt: serverTimestamp()
      })
      url.value = dlUrl
    })
  })

  return { progress, url, error }
}

export default useStorage