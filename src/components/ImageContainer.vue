<!--A custom component to contain each image -->

<script setup>
import {toRefs} from "vue";

const props = defineProps(['image', 'status'])
const {image, status} = toRefs(props)
const emit = defineEmits(['saveImage', 'removeImage'])

function save(image) {
  emit("saveImage", image)
}

function remove(image) {
  emit("removeImage", image)
}

</script>

<template>
  <img
      :src='image.contentUrl'
      :alt='image.name'
      @click="status? save(image) : remove(image)"
  />
  <span>{{image.name}}</span>
</template>

<style scoped>
span {
  padding: 5px 0 5px 0;
  text-align: center;
}
</style>