<script setup>
import { defineProps } from "vue"

const { image, name, occupation } = defineProps([
    'image',
    'name',
])
</script>

<template>
    <NCard>
        <template #cover>
            <img :src="image">
        </template>
        <h3>{{ name }}</h3>
        <!-- <div class="jobs">
            <p v-for="(job, index) in occupation" :key="job">
                {{ job }}<span v-if="index < occupation.length - 1">,&nbsp</span>
            </p>
        </div> -->
        <slot></slot>
    </NCard>
</template>

<style scoped>
.n-card {
    width: 200px;
    margin: 10px 20px;

}

.n-card img {
    height: 250px
}

p {
    font-size: 10px;
}

.jobs {
    display: flex;
    flex-wrap: wrap;
}
</style>