<script setup>
import { ref } from "vue";
import RickMortyCards from './components/RickMortyCards.vue';
import PracticeSlot from "./components/PracticeSlot.vue";
import Hero from "./components/Hero.vue"
import StarWarsCardsSuspense from "./components/StarWarsCardsSuspense.vue";

const isSW = ref(true);

</script>

<template>
  <main>
    <Hero :isSW="isSW" @selectShow="isSW = !isSW" />
    <!-- <StarWarsCardsSuspense v-if="isSW" />
    <RickMortyCards v-else /> -->
    <!-- KeeALive keep components in cache {i.e} keep page even if component was change, it helps save requests -->
    <KeepAlive>
      <Component :is="isSW ? StarWarsCardsSuspense : RickMortyCards" />
    </KeepAlive>
    <PracticeSlot>
      <h1>Hello</h1>
      <template #header>
        <div>
          <h2>Header slot</h2>
          <a href="http://">Page 1</a>
          <a href="http://">Page 2</a>
        </div>
      </template>
      <template #footer>
        <div>
          <ul>
            <li>Facebook</li>
            <li>Linkedin</li>
            <li>Instagram</li>
            <li>Twitter</li>
          </ul>
        </div>
      </template>
    </PracticeSlot>
  </main>
</template>

<style scoped>
.cards {
  height: 700px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>