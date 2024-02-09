<script setup>
import Card from './Card.vue';
import Container from './Container.vue';

const data = [
    {
        id: 1,
        username: "Laith",
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        caption: "Vue Master",
    },
    {
        id: 2,
        username: "Mike",
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        caption: "Hello guys",

    },
    {
        id: 3,
        username: "Andy",
        url: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        caption: "React rulez",

    }
]

</script>

<template>
    <Container>
        <div class="timeline-container">
            <Card v-for="post in data" :key="post.id" :post="post" />
        </div>
    </Container>
</template>

<style scoped>
.timeline-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}
</style>