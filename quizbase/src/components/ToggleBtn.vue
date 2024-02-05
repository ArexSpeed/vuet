<script setup>
import { ref } from 'vue';

const showGreet = ref(true);
</script>

<template>
    <div>
        <div class="container">
            <Transition name="fade">
                <h3 v-if="showGreet">Hello World</h3>
                <h3 v-else>Good bye</h3>
            </Transition>
        </div>
        <button @click="showGreet = !showGreet">Toggle</button>
    </div>
</template>

<style scoped>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}

.fade-enter-active {
    transition: all 0.4s ease;
}

.fade-leave-from {
    opacity: 1;
}

.fade-leave-to {
    opacity: 0;
}

.fade-leave-active {
    transition: all 0.4s ease;
}

.container {
    position: relative;
}

h3 {
    position: absolute;
}

button {
    margin-top: 50px;
}
</style>