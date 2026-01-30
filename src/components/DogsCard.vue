<script setup>
import { NCard, NButton, } from 'naive-ui'
const props=defineProps({
    dog:Object
})

const emit=defineEmits(['remove'])

const handleRemove=()=>{
    emit('remove',props.dog.id)
}

</script>
<template>
  <n-card bordered="true" :title="dog.attributes.name" hoverable>
    <template #header-extra>
      <h1>{{ dog.type }}</h1>
    </template>
    <template #default>
        <p>{{ dog.attributes.description }}</p>
    </template>
    <template #footer>
      <n-button type="error" @click="handleRemove">
        Remove {{ dog.attributes.name }}
      </n-button>
    </template>
  </n-card>
</template>

<style scoped>
.n-card {
  max-width: 300px;
}
</style>
