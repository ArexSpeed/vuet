<script setup>
import { TransitionGroup, ref } from 'vue';

const names = ref(["Selina", "Kevin", "John"]);
const nameInput = ref("");

const addInvitee = () => {
    names.value.unshift(nameInput.value);
    nameInput.value = "";
}
</script>

<template>
    <div>

        <div class="container">
            <input type="text" placeholder="Add person to invite" v-model="nameInput" @keypress.enter="addInvitee" />
            <TransitionGroup name="invitees">
                <li v-for="name in names" :key="name">{{ name }}</li>
            </TransitionGroup>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 300px;
    margin: 0 auto;
}

.container input {
    width: 300px;
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.23);
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: 1px 1px 4px rgba(255, 255, 255, 0.2);
}

ul {
    display: inline;
    list-style: none;
    margin: 0px;
    padding: 0px;
}

li {
    width: 300px;
    list-style: none;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 10px;
    text-align: center;
    box-shadow: 1px 1px 4px rgba(255, 255, 255, 0.2);
    cursor: pointer;
}

/* Transition group */
.invitees-enter-from {
    opacity: 0;
    transform: scale(0.5);
}

.invitees-enter-to {
    opacity: 1;
    transform: scale(1);
}

.invitees-enter-active {
    transition: all 0.5s ease;
}

.invitees-leave-active {
    transition: all 0.5s ease;
    position: absolute;

}

.invitees-move {
    transition: all 0.5s ease;
}
</style>