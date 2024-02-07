<script setup>
const emit = defineEmits(["selectShow"])
const { isSW } = defineProps(['isSW'])

const emitSelectedShow = () => {
    emit("selectShow")
}
</script>

<template>
    <div class="hero">
        <h1>{{ isSW ? 'Star Wars' : 'Rick and Morty' }}</h1>
        <p @click="emitSelectedShow">{{ !isSW ? 'Star Wars' : 'Rick and Morty' }}</p>
    </div>
</template>

<style scoped>
h1 {
    margin: 0px auto;
}
</style>