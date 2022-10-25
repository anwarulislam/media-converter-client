<template>
  <div class="x-flex x-w-full x-items-center">
    <label
      for="dropzone-file"
      @drop.prevent="dropHandler"
      @dragover.prevent="dragoverHandler('dragover')"
      @dragleave.prevent="dragoverHandler('dragleave')"
      :class="{
        'x-cursor-pointer': type === 'button',
        'dark:hover:x-bg-bray-800 x-flex x-h-64 x-w-full x-cursor-pointer x-flex-col x-items-center x-justify-center x-rounded-lg x-border-2 x-border-dashed x-border-gray-300 x-bg-gray-100 hover:x-bg-gray-200 dark:x-border-gray-600 dark:x-bg-gray-700 dark:hover:x-border-gray-500 dark:hover:x-bg-gray-600':
          type === 'div',
        dragover: isDragging,
      }"
    >
      <div
        v-if="type === 'div'"
        class="x-flex x-flex-col x-items-center x-justify-center x-pt-5 x-pb-6"
      >
        <svg
          aria-hidden="true"
          class="x-mb-3 x-h-10 x-w-10 x-text-gray-400"
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
        <p class="x-mb-2 x-text-sm x-text-gray-500 dark:x-text-gray-400">
          <span class="x-font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="x-text-xs x-text-gray-500 dark:x-text-gray-400">
          Audio and Video (MAX. 500MB)
        </p>
      </div>

      <div v-if="type === 'button'" class="choose-button group">
        <span
          class="x-relative x-rounded-md x-bg-white x-px-5 x-py-2.5 x-transition-all x-duration-75 x-ease-in group-hover:x-bg-opacity-0 dark:x-bg-gray-900"
        >
          Choose Files
        </span>
      </div>

      <input
        id="dropzone-file"
        type="file"
        class="x-hidden"
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
  @apply x-relative;
  @apply x-mb-2;
  @apply x-mr-2;
  @apply x-inline-flex;
  @apply x-items-center;
  @apply x-justify-center;
  @apply x-overflow-hidden;
  @apply x-rounded-lg;
  @apply x-bg-gradient-to-br;
  @apply x-from-purple-600;
  @apply x-to-blue-500;
  @apply x-p-0.5;
  @apply x-text-sm;
  @apply x-font-medium;
  @apply x-text-gray-900;
  @apply hover:x-text-white;
  @apply focus:x-outline-none;
  @apply focus:x-ring-4;
  @apply focus:x-ring-blue-300;
  @apply group-hover:x-from-purple-600;
  @apply group-hover:x-to-blue-500;
  @apply dark:x-text-white;
  @apply dark:focus:x-ring-blue-800;
}

.dragover {
  @apply x-border-2;
  @apply x-border-inherit;
  @apply x-bg-gray-300;
  @apply x-border-green-600;
  border-style: inherit !important;
}
</style>
