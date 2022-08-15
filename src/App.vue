<template>
  <div class="container mx-auto py-10 px-4">
    <ChooseFile
      :type="files.length ? 'button' : 'div'"
      class="mb-5"
      @file-added="addFile"
    />

    <div class="file-list mb-5" v-if="files.length">
      <File v-for="file in files" :key="file.name" :file="file" />
    </div>

    <button
      v-if="files.length"
      type="button"
      class="flex ml-auto items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Convert
      <svg
        aria-hidden="true"
        class="ml-2 -mr-1 h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import ChooseFile from "./components/ChooseFile.vue";
import File from "./components/File.vue";
import { FileType } from "./types";

const files = ref<FileType[]>([]);

const addFile = (file: FileType) => {
  localStorage.setItem("name", file.name);
  files.value.push(file);
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
