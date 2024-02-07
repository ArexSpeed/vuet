<script setup>
import axios from "axios";
import { ref, watch } from "vue";
import Card from "./Card.vue";

const characters = ref(null);
const page = ref(1);

const nextPage = () => {
    page.value++;
}

const prevPage = () => {
    page.value--;
}

const response = await axios.get("https://swapi.dev/api/people");
characters.value = response.data.results;
console.log(characters.value)

watch(page, async () => {
    const response = await axios.get(`https://swapi.dev/api/people?page=${page.value.toString()}`)
    characters.value = response.data.results;

})


</script>

<template>
    <div class="container">

        <div class="cards">
            <Card v-for="character in characters" :key="character.name" :image="character.img" :name="character.name">
                <div>
                    <p>{{ character.skin_color }}</p>
                </div>
            </Card>
        </div>
        <div class="button-container">
            <button @click="prevPage">Prev</button>
            <button @click="nextPage">Next</button>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: rgb(27, 26, 26);
    padding: 30px
}

.cards {
    max-width: 1000px;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

}

.cards h3 {
    font-weight: bold;
}

.cards p {
    font-size: 10px;
}

.jobs {
    display: flex;
    flex-wrap: wrap;
}

.button-container {
    display: flex;
    justify-content: center;
    padding-top: 30px
}

.button-container button {
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin: 0 5px;
    cursor: pointer;
}

.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>