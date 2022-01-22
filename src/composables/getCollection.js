import { ref, watchEffect } from 'vue'
import { db } from '../firebase/config'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

const getCollection = (c) => {
  const documents = ref(null)

  // collection reference
  let colRef = collection(db, c)
  colRef = query(colRef, orderBy('createdAt', 'desc'))
 
  const unsub = onSnapshot(colRef, snap => {
    let results = []
    snap.docs.forEach(doc => {
      results.push({ ...doc.data(), id: doc.id })
    })
    documents.value = results
    console.log(documents.value)
  })

watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  })

  return { documents }
}

export default getCollection