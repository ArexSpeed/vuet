<script setup>
import Container from './Container.vue';
import ImageGallery from './ImageGallery.vue';
import UserBar from './UserBar.vue';

</script>

<template>
    <Container>
        <div class="profile-container">
            <UserBar username="Laith" :userInfo="{
                posts: 4,
                followers: 100,
                following: 2312
            }" />
            <ImageGallery :posts="[{
                id: 1,
                image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
            },
            {
                id: 2,
                image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
            }]" />
        </div>
    </Container>
</template>

<style scoped>
.profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}
</style>