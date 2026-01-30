<script setup>
const props=defineProps({
    user:Object
})

const emit=defineEmits(['remove'])

const handleRemove=()=>{
    emit('remove',props.user.id)
}

</script>
<template>
    <button v-on:click="handleRemove">{{ props.user.name }}</button>
</template>