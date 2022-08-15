<template>
  <div class="container mx-auto py-10 px-4">
    <ChooseFile
      :type="files.length ? 'button' : 'div'"
      class="mb-5"
      @file-added="addFile"
    />
    <FileLists v-if="files.length" :files="files" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import ChooseFile from "./components/ChooseFile.vue";
import FileLists from "./components/FileLists.vue";
import { FileType } from "./types";

const files = ref<FileType[]>([]);

const addFile = (file: FileType) => {
  files.value.push(file);
};
</script>
