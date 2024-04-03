<!--The component with the result area and the saved image area -->

<script setup>
import {toRefs} from "vue";
import ImageContainer from "../components/ImageContainer.vue";
import {useStorage} from "../utils/hooks.js";
import {MOOD_IMAGES} from "../utils/constants.js";

const props = defineProps(['result'])

const {result} = toRefs(props)

const moodBoardImages = useStorage(MOOD_IMAGES, [])

function saveImage(image) {
  moodBoardImages.setItem([...moodBoardImages.storedValue.value, image])
}

function removeImage(image) {
  if (confirm("Are you sure to remove this picture from the board?")) {
    const xx = moodBoardImages.storedValue.value.findIndex(item => item.name === image.name);
    moodBoardImages.storedValue.value.splice(xx, 1)
    moodBoardImages.setItem(moodBoardImages.storedValue.value)
  }
}
</script>

<template>
  <div class="container">
    <div class="result-area">
      <div class="top-bar">
        <p>Results (click the images to save!)</p>
      </div>
      <section>
        <p v-if="result.length === 0">Start searching for pictures!</p>
        <div v-else class="result-image-container" v-for="(image, index) in result" :key="index">
          <ImageContainer @saveImage="saveImage"
                          :image="image"
                          :status="true"/>
        </div>
      </section>
    </div>

    <div class="save-area">
      <div class="top-bar">
        <p>Board (click the images to remove)</p>
      </div>
      <section>
        <p v-if="moodBoardImages.storedValue.value.length === 0">Your board is empty now!</p>
        <div v-else class="saved-image-container" v-for="(image, index) in moodBoardImages.storedValue.value" :key="index">
          <ImageContainer @saveImage="saveImage"
                          @removeImage="removeImage"
                          :image="image"
                          :status="false"/>
        </div>
      </section>
    </div>
  </div>

</template>

<style scoped>
p {
  color: #BFA006;
  font-size: 2rem;
  font-weight: bold;
}

section {
  display: flex;
  flex-wrap: wrap;
}

span {
  padding: 5px 0 5px 0;
  text-align: center;
}

.container {
  display: flex;
  height: 80vh;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.container > * {
  overflow-y: auto;
}

.top-bar {
  background: rgba(224, 224, 224);
  position: sticky;
  top: 0;
  padding: 15px;
}

.result-area {
  width: 60%;
  padding: 0 0 10px;
  background: rgba(224, 224, 224);
  border-radius: 15px;
  margin-right: 30px;
}

.result-image-container, .saved-image-container {
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 10px 20px 10px;
  padding: 20px;

}

.result-image-container {
  flex: calc(33.33% - 20px);
  max-width: calc(33.33% - 20px);
}

.save-area {
  width: 40%;
  padding: 0 0 10px;
  background: rgba(224, 224, 224);
  border-radius: 15px;
  overflow-y: auto;
}

.saved-image-container {
  flex: calc(50% - 20px);
  max-width: calc(50% - 20px);
}

/* Responsive layout - makes a two column-layout */
@media (max-width: 1500px) {
  .result-image-container {
    flex: calc(50% - 20px);
    max-width: calc(50% - 20px);
  }
  .saved-image-container {
    flex: calc(100% - 20px);
    max-width: calc(100% - 20px);
  }
}

/* Responsive layout - makes a one column-layout */
@media (max-width: 1000px) {
  .result-image-container {
    flex: calc(100% - 20px);
    max-width: calc(100% - 20px);
  }
}

</style>