<script setup>
import useNumbers from "@/composables/useNumbers";
import { useAgesStore } from "../stores/ages"


const { numbers, filterNum, addNumber } = useNumbers();
const { doubleAge } = useAgesStore();

</script>

<template>
    <div>
        <h1>GreatGrandChild {{ numbers }}</h1>
        <h2>{{ doubleAge }}</h2>
        <button @click="filterNum(5)">Filter</button>
        <button @click="addNumber(8)">Add</button>


    </div>
</template>