<script setup lang="ts">
import type { AsyncState } from "@/types";
const props = defineProps<{
  title?: string;
  body?: string;
  state?: AsyncState;
}>();

const isError = computed(() => props.state === "error");
const isLoading = computed(() => props.state === "loading");
</script>
<template>
  <div class="border-t-4 shadow-xl card bg-base-100 border-primary">
    <div class="card-body">
      <h2 class="card-title">
        <slot name="title">{{ title }}</slot>
        <AppLoading v-if="isLoading" />
        <span v-if="isError" class="text-sm font-normal text-red-500">
          Error generating announcement
        </span>
      </h2>

      <div v-if="body">
        <hr class="pb-5 opacity-10" />
        <pre class="font-sans text-lg whitespace-pre-wrap">{{ body }}</pre>
      </div>
      <div v-else>
        <span class="italic opacity-80">Import an article to generate an announcement</span>
      </div>

      <div class="justify-end card-actions" v-if="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
