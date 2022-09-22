<template>
  <div class="flex w-full items-center">
    <label
      for="dropzone-file"
      @drop.prevent="dropHandler"
      @dragover.prevent="dragoverHandler('dragover')"
      @dragleave.prevent="dragoverHandler('dragleave')"
      :class="{
        'cursor-pointer': type === 'button',
        'dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600':
          type === 'div',
        dragover: isDragging,
      }"
    >
      <div
        v-if="type === 'div'"
        class="flex flex-col items-center justify-center pt-5 pb-6"
      >
        <svg
          aria-hidden="true"
          class="mb-3 h-10 w-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">
          Audio and Video (MAX. 500MB)
        </p>
      </div>

      <div v-if="type === 'button'" class="choose-button group">
        <span
          class="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900"
        >
          Choose Files
        </span>
      </div>

      <input
        id="dropzone-file"
        type="file"
        class="hidden"
        multiple
        accept=".mp3,audio/*,video/*"
        @change="onFileChoose"
        ref="filesRef"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  type: "button" | "div";
}>();
const emit = defineEmits(["file-added"]);

const isDragging = ref(false);
const filesRef = ref<any>();

const dragoverHandler = (type: "dragover" | "dragleave") => {
  isDragging.value = type === "dragover" ? true : false;
  console.log(isDragging.value);
};

const dropHandler = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files || [];
  for (let i = 0; i < files.length; i++) {
    addFileToList(files[i]);
  }
};

const onFileChoose = (event: Event) => {
  const { files }: { files: File[] } = filesRef.value;
  console.log(files.length);
  for (let i = 0; i < files.length; i++) {
    addFileToList(files[i]);
  }
};

const addFileToList = (file: File) => {
  emit("file-added", {
    id: Date.now(),
    file,
    name: file.name,
    size: file.size,
    type: file.type,
  });
};
</script>

<style>
.choose-button {
  @apply relative;
  @apply mb-2;
  @apply mr-2;
  @apply inline-flex;
  @apply items-center;
  @apply justify-center;
  @apply overflow-hidden;
  @apply rounded-lg;
  @apply bg-gradient-to-br;
  @apply from-purple-600;
  @apply to-blue-500;
  @apply p-0.5;
  @apply text-sm;
  @apply font-medium;
  @apply text-gray-900;
  @apply hover:text-white;
  @apply focus:outline-none;
  @apply focus:ring-4;
  @apply focus:ring-blue-300;
  @apply group-hover:from-purple-600;
  @apply group-hover:to-blue-500;
  @apply dark:text-white;
  @apply dark:focus:ring-blue-800;
}

.dragover {
  @apply border-2;
  @apply border-inherit;
  @apply bg-gray-300;
  @apply border-green-600;
  border-style: inherit !important;
}
</style>
