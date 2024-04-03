<script setup>
import {ref} from "vue";
import Navbar from "./Views/Navbar.vue";
import SearchBar from "./Views/SearchBar.vue";
import Images from "./Views/Images.vue";

let searchResult = ref([])


function getSearchResult(result) {
  searchResult.value = result
}

</script>

<template>
  <Navbar />
  <SearchBar @getSearchResult="getSearchResult"/>
  <Images :result="searchResult"/>
</template>

<style scoped>
</style>