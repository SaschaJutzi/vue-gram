<template>
  <div class="App">
    <Title />
    <UploadForm />
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

export default {
  components: {
    ImageGrid,
    Title,
    UploadForm,
    Modal,
  },
  setup() {
    const selectedImgUrl = ref(null)

    const updateSelectedImgUrl = (url) => {
      selectedImgUrl.value = url
      console.log(selectedImgUrl.value)
    }

    return { selectedImgUrl, updateSelectedImgUrl }
  },
}
</script>

<style></style>
