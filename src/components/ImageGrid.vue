<template>
  <transition-group tag="div" name="grid" appear class="img-grid">
    <div
      v-for="img in images"
      :key="img.id"
      class="img-wrap"
      @click="handleClick(img.url)"
    >
      <img :src="img.url" @load="loading" v-show="isLoaded" />
      <Spinner v-if="!isLoaded" />
    </div>
  </transition-group>
</template>

<script>
import { ref } from 'vue'
import getCollection from '../composables/getCollection'
import Spinner from './Spinner.vue'

export default {
  components: {
    Spinner,
  },
  setup(props, context) {
    const isLoaded = ref(false)

    const loading = () => {
      isLoaded.value = true
    }

    const { documents: images } = getCollection('images')

    const handleClick = (url) => {
      context.emit('selected', url)
    }

    return { images, handleClick, loading, isLoaded }
  },
}
</script>

<style>
.img-grid {
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

/* large tablet & laptop styles */
@media screen and (min-width: 960px) {
  .img-grid {
    grid-gap: 40px;
  }
}

.img-wrap {
  overflow: hidden;
  height: 0;
  padding: 50% 0;
  /* padding controls height, will always be perfectly square regardless of width */
  position: relative;
  opacity: 0.8;
}
.img-wrap img {
  min-width: 100%;
  min-height: 100%;
  max-width: 180%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

/* transition classes */
.grid-enter-from {
  opacity: 0;
}
.grid-enter-to {
  opacity: 1;
}
.grid-enter-active {
  transition: all 3s ease;
}
.grid-move {
  transition: all 0.5s ease;
}
</style>
