<template>
  <div class="container mx-auto py-10 px-4">
    <ChooseFile v-if="!files.length" class="mb-5" @file-added="addFile" />
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
  files.value.push({
    name: 'file.name',
    type: 'file.type',
    size: 122656,
    url: 'file.url',
  })
};
</script>
