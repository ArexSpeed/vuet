<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <header class="header">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </header>
    <Transition name="routes">
      <RouterView />
    </Transition>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  max-width: 300px;
  margin: 0 auto;
}

.header a {
  margin-right: 10px;
}

.routes-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.routes-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.routes-enter-active {
  transition: all 0.5s ease;
}
</style>