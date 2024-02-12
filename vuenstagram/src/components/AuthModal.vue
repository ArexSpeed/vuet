<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useUsersStore } from "@/stores/users";
import { storeToRefs } from 'pinia';

const userStore = useUsersStore();
const { errorMessage, loading, user } = storeToRefs(userStore);

const props = defineProps(['isLogin'])
const open = ref<boolean>(false);

const userCredentials = reactive({
    email: "",
    password: "",
    username: "",
})

const showModal = () => {
    open.value = true;
};

const clearUserCredentialsInputs = () => {
    userCredentials.email = "";
    userCredentials.password = "";
    userCredentials.username = "";
    userStore.clearErrorMessage();
}

const handleOk = async (e: MouseEvent) => {
    if (props.isLogin) {
        await userStore.handleLogin({
            password: userCredentials.password,
            email: userCredentials.email
        });
    }
    else {
        await userStore.handleSignup(userCredentials);
    }

    if (user.value) {
        open.value = false;
        clearUserCredentialsInputs();
    }
};

const handleCancel = () => {
    clearUserCredentialsInputs();
    open.value = false;
}

const title = props.isLogin ? 'Login' : "Signup"
</script>

<template>
    <div>
        <a-button type="primary" @click="showModal" class="btn">{{ title }}</a-button>
        <a-modal v-model:open="open" :title="title">
            <template #footer>
                <a-button key="back" @click="handleCancel">Cancel</a-button>
                <a-button :disabled="loading" key="submit" type="primary" @click="handleOk">Submit</a-button>
            </template>
            <div v-if="!loading" class="input-container">
                <a-input class="input" v-if="!isLogin" v-model:value="userCredentials.username" placeholder="Username" />
                <a-input class="input" v-model:value="userCredentials.email" placeholder="Email" />
                <a-input class="input" v-model:value="userCredentials.password" placeholder="Password" />
            </div>
            <div v-else class="spinner">
                <a-spin />
            </div>

            <a-typography-text v-if="errorMessage" type="danger">{{ errorMessage }}</a-typography-text>
        </a-modal>
    </div>
</template>

<style scoped>
.btn {
    margin-left: 10px;
}

.input {
    margin-top: 5px;
}

.input-container {
    height: 120px;
}

.spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
}
</style>