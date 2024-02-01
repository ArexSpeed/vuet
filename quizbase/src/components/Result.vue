<script setup>
import { RouterLink } from 'vue-router';
const { quizQuestionLength, numberOfCorrectAnserws } = defineProps(['quizQuestionLength', 'numberOfCorrectAnserws'])
</script>

<template>
    <div class="results">
        <p>Your results...</p>
        <h1>{{ numberOfCorrectAnserws }}/{{ quizQuestionLength }}</h1>
        <RouterLink to="/">Go back</RouterLink>
    </div>
</template>

<style scoped>
.result {
    text-align: center;
    padding: 100px 0;
}

p {
    font-size: 25px;
}

h1 {
    font-size: 80px;
}
</style>