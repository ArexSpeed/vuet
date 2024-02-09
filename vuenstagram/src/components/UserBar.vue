<script setup>
const props = defineProps(['username', 'userInfo'])
</script>

<template>
    <div class="userbar-container">
        <div class="top-content">
            <a-typography-title :level="2">{{ props.username }}</a-typography-title>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{ props.userInfo.posts }} posts</a-typography-title>
            <a-typography-title :level="5">{{ props.userInfo.followers }} followers</a-typography-title>
            <a-typography-title :level="5">{{ props.userInfo.following }} following</a-typography-title>
        </div>
    </div>
</template>

<style scoped>
.userbar-container {
    display: flex;
    flex-direction: column;
    padding-bottom: 75px;
    background-color: aquamarine;
}

.bottom-content {
    display: flex;
    align-items: center;
    background-color: aqua;
}

.bottom-content h5 {
    margin: 0 !important;
    padding: 0;
    margin-right: 30px !important;
}
</style>