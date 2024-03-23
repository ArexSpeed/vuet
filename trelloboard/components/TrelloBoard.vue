<script setup lang="ts">
import { ref } from 'vue';
import type { Column, Task } from "../types"
import { nanoid } from 'nanoid';
import draggable from 'vuedraggable';

const columns = useLocalStorage<Column[]>("trelloBoard", [
    {
        id: nanoid(),
        title: "Backlog",
        tasks: [
            { id: nanoid(), title: "Create marketing page", createdAt: new Date() },
            { id: nanoid(), title: "Create plan", createdAt: new Date() },
            { id: nanoid(), title: "Make Ui", createdAt: new Date() }
        ]
    },
    {
        id: nanoid(),
        title: "In Progress",
        tasks: [
            { id: nanoid(), title: "Create dashboard", createdAt: new Date() }
        ]
    },
    {
        id: nanoid(),
        title: "Tests",
        tasks: [
            { id: nanoid(), title: "Create admin page", createdAt: new Date() }
        ]
    },
    {
        id: nanoid(),
        title: "Done",
        tasks: [
            { id: nanoid(), title: "Create profile page", createdAt: new Date() }
        ]
    },

],
    {
        serializer: {
            read: (value) => {
                return JSON.parse(value).map((column: Column) => {
                    column.tasks = column.tasks.map((task: Task) => {
                        task.createdAt = new Date(task.createdAt);
                        return task;
                    });
                    return column;
                })
            },
            write: (value) => JSON.stringify(value)
        }
    }
);

const alt = useKeyModifier("Alt");

function createColumn() {
    const column: Column = {
        id: nanoid(),
        title: "",
        tasks: [],
    }
    columns.value.push(column);
    nextTick(() => {
        (document.querySelector(".column:last-of-type .title-input") as HTMLInputElement).focus()
    })
}

watch(columns, () => {

}, {
    deep: true
})
</script>

<template>
    <div class="flex items-start gap-4 overflow-x-auto">
        <draggable v-model="columns" group="columns" :animation="150" handle=".drag-handle" item-key="id"
            class="flex items-start gap-4">
            <template #item="{ element: column }: { element: Column }">
                <div class="bg-gray-200 p-5 rounded min-w-[250px]">
                    <header class="mb-4 font-bold cursor-move drag-handle">
                        <input class="w-4/5 px-1 bg-transparent rounded focus:bg-white title-input"
                            @keyup.enter="($event.target as HTMLInputElement).blur()"
                            @keydown.backspace="column.title === '' ? columns = columns.filter(c => c.id !== column.id) : null"
                            type="text" v-model="column.title" />
                    </header>
                    <draggable v-model="column.tasks" :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
                        :animation="150" item-key="id">
                        <template #item="{ element: task }: { element: Task }">
                            <div>
                                <TrelloBoardTask :task="task"
                                    @delete="column.tasks = column.tasks.filter((t) => t.id !== $event)" />
                            </div>
                        </template>
                    </draggable>
                    <footer>
                        <NewTask @add="column.tasks.push($event)" />
                    </footer>
                </div>
            </template>
        </draggable>
        <button @click="createColumn" class="p-2 bg-gray-200 rounded opacity-50 whitespace-nowrap">+ Add another
            column</button>

    </div>
</template>