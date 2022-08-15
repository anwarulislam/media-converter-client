<template>
  <div class="file-list">
    <div class="file-list-item grid grid-cols-2" v-for="file in files">
      <div>{{ file.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileType } from "./../types/index";

defineProps<{
  files?: FileType[];
}>();
const emit = defineEmits(["file-added"]);
const onFileChoose = (file: Event) => {
  console.log(file);
};
</script>

<style scoped>
.file-list {
  @apply border;
  @apply border-gray-200;
  @apply bg-white;
  @apply font-medium;
  @apply text-gray-900;
  @apply dark:border-gray-600;
  @apply dark:bg-gray-700;
  @apply dark:text-white;
}
.file-list .file-list-item {
  @apply w-full;
  @apply border-gray-200;
  @apply py-5;
  @apply px-5;
  @apply dark:border-gray-600;
}

.file-list .file-list-item:not(:last-child) {
  @apply border-b;
}
</style>
