<script setup>
import {ref,getCurrentInstance} from "vue"
const message=ref("hello world")

// const globals=getCurrentInstance().appContext.config.globalProperties
// console.log(globals.$appName)
</script>

<template>
  <h1>You did it! {{$appName}}</h1>
  <p>Today Date : {{$formatDate}}</p>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <p>
    <Homes/>
  </p>
</template>

<style scoped></style>
