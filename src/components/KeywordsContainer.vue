<!--The component that contains all the keywords -->

<script setup>
import {ref, toRefs} from "vue";

let show = ref(true)
const emit = defineEmits(['newSearch', 'clear'])
const props = defineProps(['keywordsArray', 'isForHistory'])

const {keywordsArray} = toRefs(props)
function toggleShow() {
  show.value = !show.value
}
</script>

<template>
  <div class="keywords-container" v-if="keywordsArray.length > 0">
    <p>
      <slot></slot>
      <i v-if="isForHistory" class="bi bi-trash" @click="() => emit('clear', keywordsArray)"></i>
      <i v-if="show" class="bi bi-chevron-up" @click="toggleShow"></i>
      <i v-else class="bi bi-chevron-down" @click="toggleShow"></i>
    </p>
    <ul v-if="show">
      <li v-for="(keyword, index) in keywordsArray"
          :id="index"
          @click="emit('newSearch', keyword)"
      >
        {{keyword}}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.keywords-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.keywords-container p {
  font-size: 1.5rem;
  padding: 5px 30px 0 0;
}
.keywords-container ul {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 4px 0;
  padding: 0;
  /* deactivate clicks*/
  pointer-events: none;
}

.keywords-container li {
  display: block;
  border: 1px solid gray;
  border-radius: 3px;
  margin: 4px;
  padding: 4px;
  cursor: pointer;
  /* allow clicks*/
  pointer-events: auto;
}
</style>