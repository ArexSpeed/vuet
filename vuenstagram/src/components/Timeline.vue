<script setup>
import { storeToRefs } from 'pinia';
import Cards from './Cards.vue';
import LogInMessage from './LogInMessage.vue';
import Container from './Container.vue';
import { useUsersStore } from "@/stores/users";

const userStore = useUsersStore();
const { user, loadingUser } = storeToRefs(userStore);

</script>

<template>
    <Container>
        <div v-if="!loadingUser">
            <Cards v-if="user" />
            <LogInMessage v-else />
        </div>
        <div v-else class="spinner">
            <a-spin />
        </div>
    </Container>
</template>

<style scoped>
.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
}
</style>