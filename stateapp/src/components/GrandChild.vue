<script setup>
import GreatGrandChild from "./GreatGrandChild.vue";
import useNumbers from "@/composables/useNumbers";
import { useAgesStore } from "../stores/ages"


const { numbers, addNumber } = useNumbers();
const { addAge, ages } = useAgesStore();

</script>

<template>
    <div>
        <h1>GrandChild {{ numbers }} {{ ages }}</h1>
        <button @click="addNumber(5)">Add</button>
        <button @click="addAge(15)">Add age</button>
        <div class="line"></div>
        <GreatGrandChild />
    </div>
</template>