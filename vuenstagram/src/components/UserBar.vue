<script setup>
import UploadPhotoModal from './UploadPhotoModal.vue';
import { useRoute } from 'vue-router';
import { useUsersStore } from '@/stores/users';
import { storeToRefs } from 'pinia';
import { supabase } from '@/supabase';

const route = useRoute();
const userStore = useUsersStore();

const { user } = storeToRefs(userStore);
const { username: profileUsername } = route.params;

const props = defineProps(['user', 'userInfo', 'addNewPost', 'isFollowing', 'updateIsFollowing'])

const followUser = async () => {
    props.updateIsFollowing(true)
    await supabase.from("followers_following").insert({
        follower_id: user.value.id,
        following_id: props.user.id
    })
}

const unfollowUser = async () => {
    props.updateIsFollowing(false)

    await supabase.from("followers_following").delete().eq('follower_id', user.value.id).eq("following_id", props.user.id)
}
</script>

<template>
    <div class="userbar-container" v-if="props.user">
        <div class="top-content">
            <a-typography-title :level="2">{{ props.user.username }}</a-typography-title>
            <div v-if="user">
                <UploadPhotoModal v-if="user && profileUsername === user.username" :addNewPost="addNewPost" />
                <div v-else>

                    <a-button v-if="!props.isFollowing" @click="followUser">Follow</a-button>
                    <a-button v-else @click="unfollowUser">Following</a-button>
                </div>
            </div>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{ props.userInfo.posts }} posts</a-typography-title>
            <a-typography-title :level="5">{{ props.userInfo.followers }} followers</a-typography-title>
            <a-typography-title :level="5">{{ props.userInfo.following }} following</a-typography-title>
        </div>
    </div>
    <div class="userbar-container" v-else>
        <div class="top-content">
            <a-typography-title :level="2">User not found</a-typography-title>

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

.top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>