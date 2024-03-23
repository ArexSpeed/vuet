
import type { createHydrationRenderer } from 'vue';
<script setup lang="ts">
import type { Task, ID } from "@/types";
const props = defineProps<{
    task: Task
}>()
const emit = defineEmits<{
    (e: "delete", payload: ID): void
}>();

const focused = ref(false);
onKeyStroke("Backspace", (e) => {
    if (focused.value) emit('delete', props.task.id)
})
</script>

<template>
    <div :title="task.createdAt" class="task flex bg-white p-2 mb-2 rounded shadow-sm max-w-[250px]" @focus="focused = true"
        @blur="focused = false" tabindex="0">
        <span>
            {{ task.title }}
        </span>
    </div>
</template>

<style scoped>
.sortable-chosen {
    background: rgb(149, 190, 149);

}

.sortable-drag .task {
    background: rgb(236, 141, 141);
    transform: rotate(5deg);

}

.sortable-ghost .task {
    background: rgb(183, 183, 231);
    position: relative;
}

.sortable-ghost .task::after {
    content: "";
    @apply absolute top-0 bottom-0 left-0 right-0 bg-slate-300;
}

.task:focus,
.task:focus-visible {
    @apply outline-gray-400 !important;
    outline: gray auto 1px;
}
</style>