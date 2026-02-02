<template>
    <h1>Welcome to DogHouse!</h1>
     <div @click="console.log('div clicket!..')">
        <button @click="(e)=>{e.stopPropagation();console.log('button clicked!..')}">click me!</button>
    </div>
</template>