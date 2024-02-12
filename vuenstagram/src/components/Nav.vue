<script setup>
import { RouterLink, useRouter } from 'vue-router';
import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";
import { ref } from 'vue';
import { useUsersStore } from "@/stores/users";
import { storeToRefs } from 'pinia';

const userStore = useUsersStore();
const { user, loadingUser } = storeToRefs(userStore);

const router = useRouter();
const searchUsername = ref("");

const onSearch = () => {
    if (searchUsername.value) {
        router.push(`/profile/${searchUsername.value}`);
    }
}

const handleLogout = async () => {
    await userStore.handleLogout();
}
</script>

<template>
    <a-layout-header>
        <Container>
            <div class="nav-container">
                <div class="right-content">
                    <RouterLink to="/">Home</RouterLink>
                    <a-input-search v-model:value="searchUsername" placeholder="input search text" style="width: 200px"
                        @search="onSearch" />
                </div>
                <div class="content" v-if="!loadingUser">
                    <div class="left-content" v-if="!user">
                        <AuthModal :isLogin="false" />
                        <AuthModal :isLogin="true" />
                    </div>
                    <div class="left-content" v-else>
                        <a-button type="primary">Profile</a-button>
                        <a-button type="primary" @click="handleLogout">Logout</a-button>
                    </div>
                </div>

            </div>
        </Container>
    </a-layout-header>
</template>

<style scoped>
.nav-container {
    background-color: aqua;
    justify-content: space-between;
    display: flex;
    padding: 8px;
}

.content {
    display: flex;
    align-items: center;
}

.right-content {
    display: flex;
    align-items: center;
}

.right-content a {
    margin-right: 10px;
}

.left-content {
    display: flex;
    align-items: center;
    gap: 10px;

}
</style>