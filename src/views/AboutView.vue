<script setup lang="ts">
import SomeInput from "@/components/TestInput.vue";
import { ref, onBeforeMount } from 'vue'

const xd = ref('asdsxsd')
const fetched = ref(null)
const valueB = ref('aaaaa')
const clickMe = () => {
  console.log('sometest')
}
const fetchData = async () => {
  const url = 'https://swapi.dev/api/people/1'
  const data = await fetch(url)
  const json = data.json()
  return json
}
onBeforeMount(async () => {
  console.log(import.meta.env)
  const data = await fetchData()
  fetched.value = data
})
</script>

<template>
  <div class="about">
    <h1>About project:</h1>
    aaaa 
    {{ fetched }}
    <SomeInput v-model:valueA="xd" v-model:valueB="valueB" />
    <p>
      {{ xd }}
      <br>
      {{ valueB }}
      I decided to build this project using vue3 with composition API and
      typescript support. For state management I chose Pinia because I want to
      try something new. The project is hosted on Netlify which makes it very
      easy to implement CI/CD. Enjoy :)
      <button @click="clickMe">asdddd</button>
    </p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
