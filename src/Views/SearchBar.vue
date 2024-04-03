<!--The search bar component -->

<script setup>
import {ref} from "vue";
import {baseUrl, BING_API_KEY, HISTORY} from "../utils/constants.js";
import KeywordsContainer from "../components/KeywordsContainer.vue";
import {useStorage} from "../utils/hooks.js";

let searchText = ref('')
let suggestedSearches = ref([])

const searchHistory = useStorage(HISTORY, [])

function addToHistory(history) {
  if (!new Set(searchHistory.storedValue.value).has(history)) {
    searchHistory.setItem([...searchHistory.storedValue.value, history])
  }
}

function clearHistory() {
  if (confirm("Are you sure to clear all search history?")) {
    searchHistory.clearItem('history')
  }
}

function getRelatedSearches(result) {
  let mappedResult = result.map(keyword => {
    return keyword.text
  })
  suggestedSearches.value = mappedResult.slice(0, 10)
}

const emit = defineEmits(['getSearchResult'])

async function search(text) {
  searchText.value = text
  if (searchText.value === "") {
    alert("search terms can not be empty!");
    return;
  }
  let url = `${baseUrl}?q=${text}`

  try {
    const response = await fetch(url, {
      headers: {
        "Ocp-Apim-Subscription-Key": BING_API_KEY
      }
    })
    const data = await response.json();
    emit('getSearchResult', data.value)
    getRelatedSearches(data.relatedSearches)
    addToHistory(text)
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <section class="search-container">
    <div class="search-bar">
      <input type="text"
             placeholder="Search images..."
             v-model="searchText"
      >
      <button @click="search(searchText)">Search</button>
    </div>
    <KeywordsContainer :keywordsArray="suggestedSearches" :isForHistory="false" @newSearch="search">
      Suggested searches
    </KeywordsContainer>
    <KeywordsContainer :keywordsArray="searchHistory.storedValue"
                       :isForHistory="true"
                       @clear="clearHistory"
                       @newSearch="search">
      Search history
    </KeywordsContainer>
  </section>

</template>

<style scoped>

.search-container {
  width: 40%;
  min-width: 600px;
  margin: 0 auto 30px auto;
  display: flex;
  flex-direction: column;
  text-align: start;
}

.search-bar {
  margin-top: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #BFA006;
  border-radius: 10px;
  padding: 5px;
}

.search-bar input {
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5rem;
  flex: 1;
  padding-left: 10px;
  border: none;
  outline: none;
}

.search-bar button {
  background-color: #BFA006;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 1.5rem;
}

.search-bar button:active {
  background-color: #a48a04;
}

</style>