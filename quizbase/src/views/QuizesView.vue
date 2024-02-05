<script setup>
import q from "@/data/quizes.json";
import { ref, watch } from "vue";
import Card from "@/components/Card.vue"
import ToggleBtn from "@/components/ToggleBtn.vue";
import InputTransition from "@/components/InputTransition.vue";
import gsap from "gsap";

const quizes = ref(q);
const search = ref("");
const showCards = ref(false);

watch(search, () => {
  quizes.value = q.filter((quiz) => quiz.name.toLowerCase().includes(search.value.toLowerCase()));
})

const beforeEnter = (el) => {
  // card-enter-from
  console.log("beforeEnter");
  el.style.opacity = 0;
  el.style.transform = "translateY(-60px)"
}

const enter = (el) => {
  // card-enter-to
  console.log("enter");
  // el.style.opacity = 1;
  // el.style.transform = "translateY(0)"
  gsap.to(el, {
    y: 0,
    opacity: 1,
    duration: 0.4,
    delay: el.dataset.index * 0.3
  })

}

const afterEnter = () => {
  console.log("afterEnter");
}
</script>

<template>
  <header>
    <h1>Quizes</h1>
    <input v-model.trim="search" type="text" placeholder="Search...">
  </header>
  <div class="options-container">
    <TransitionGroup name="card" appear @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <Card v-for="(quiz, index) in quizes" :key="quiz.id" :quiz="quiz" :data-index="index" />
    </TransitionGroup>
    <!-- <div v-for="quiz in quizes" :key="quiz.id" class="card">
        <img :src="quiz.img" alt="">
        <div class="card-text">
          <h2>{{ quiz.name }}</h2>
          <p>{{ quiz.questions.length }} questions</p>
        </div>
      </div> -->
  </div>
  <ToggleBtn />
  <InputTransition />
</template>

<style scoped>
header {
  margin-bottom: 10px;
  margin-top: 30px;
  display: flex;
  align-items: center;
}

header h1 {
  font-weight: bold;
  margin-right: 30px;
}

header input {
  border: none;
  background-color: rgba(128, 128, 128, 0.1);
  padding: 10px;
  border-radius: 5px;
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
}

/* .card-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.card-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.card-enter-active {
  transition: all 0.5s ease;
} */
</style>