<template>
  <div>
    <Title />
    <UploadForm v-if="user" />
    <ImageGrid @selected="updateSelectedImgUrl" />
    <Modal
      v-if="selectedImgUrl"
      :imgUrl="selectedImgUrl"
      @close="updateSelectedImgUrl"
    />
  </div>
</template>

<script>
import ImageGrid from '@/components/ImageGrid.vue'
import Title from '@/components/Title.vue'
import UploadForm from '@/components/UploadForm.vue'
import Modal from '@/components/Modal.vue'
import { ref } from '@vue/reactivity'
import getUser from '../composables/getUser'

export default {
  components: {
    ImageGrid,
    Title,
    UploadForm,
    Modal,
  },
  setup() {
    const { user } = getUser()

    const selectedImgUrl = ref(null)

    const updateSelectedImgUrl = (url) => {
      selectedImgUrl.value = url
      console.log(selectedImgUrl.value)
    }

    return { selectedImgUrl, updateSelectedImgUrl, user }
  },
}
</script>

<style></style>
