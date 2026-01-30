<script setup>
import { onMounted, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import Usercard from './components/Usercard.vue';
const users=ref([])
const us=ref([
  {
    id:1,
    name:"selva",
  age:21
  },
  {
    id:2,
    name:"kumar",
    age:22
  }
])
onMounted(async()=>{
  users.value=us.value
})
const removerUser=(id)=>{
  users.value=users.value.filter(u=>u.id!==id)
}

</script>

<template>
  <Navbar/>
  <h1>User Card</h1>
  <Usercard v-for="user in users"
  :user="user"
  :key="user.id"
  @remove="removerUser"/>

</template>
