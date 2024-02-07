<script setup>
import StarWarsCards from './StarWarsCards.vue';

</script>

<template>
    <Suspense>
        <template #default>
            <StarWarsCards />
        </template>
        <template #fallback>
            <div class="cards spinner">
                <NSpin size="large" />
            </div>
        </template>
    </Suspense>
</template>

<style scoped>
.cards {
    height: 700px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>