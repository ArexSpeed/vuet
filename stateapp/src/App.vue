<script setup>
import { ref, reactive, provide } from 'vue';
import Parent from "./components/Parent.vue";

// const red = ref(0);
// const green = ref(0);
// const blue = ref(0);

// const color = ref({
//   red: 0,
//   blue: 0,
//   green: 0
// });

const color = reactive({
  red: 0,
  blue: 0,
  green: 0
})

const selectRandomColor = () => {
  color.red = 166;
  color.blue = 1;
  color.green = 155;
}

// Parents
const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])

// provide - inject
provide("numbers", numbers);

const addNumber = (num) => {
  numbers.value.push(num);
}
</script>

<template>
  <main :style="{ backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})` }">
    <!-- <div>

      <input type="number" v-model="color.red" placeholder="red" />
      <input type="number" v-model="color.green" placeholder="green" />
      <input type="number" v-model="color.blue" placeholder="blue" />
      <button @click="selectRandomColor">Select</button>
    </div> -->

    <Parent />
  </main>
</template>

<style scoped>
main {
  background-color: rgb(122, 50, 255);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

div {
  display: flex;
  flex-direction: column;
}
</style>
