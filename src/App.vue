<script setup>
import { onMounted, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import DogsCardcard from './components/DogsCard.vue';
import Footer from './components/Footer.vue';
const dogs=ref([]);
const fetchDogs=async()=>{
  const response=await fetch("https://dogapi.dog/api/v2/breeds");
  const data=await response.json()
  dogs.value=data.data;
};

onMounted(async()=>{
  fetchDogs();
})

const removerUser=(id)=>{
  dogs.value=dogs.value.filter(d=>d.id!==id)
}

</script>

<template>
  <Navbar/>
  <h1>Dogs Card</h1>
  <div class="dogsCard">
  <DogsCardcard v-for="dog in dogs"
  :dog="dog"
  :key="dog.id"
  @remove="removerUser"/>
  </div>
  <Footer/>
</template>

<style scoped>
.dogsCard{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
