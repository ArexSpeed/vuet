<script setup>
import GrandChild from "./GrandChild.vue";
import { useAgesStore } from "../stores/ages"
import { inject } from "vue";

const numbers = inject("numbers");
const { ages } = useAgesStore();
</script>

<template>
    <div>
        <h1>Child {{ numbers }}</h1>
        <p>{{ ages }}</p>
        <div class="line"></div>
        <GrandChild />
    </div>
</template>