<template>
  <div class="file-list-item grid grid-cols-2">
    <div>{{ file.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { FileType } from "./../types/index";

defineProps<{
  file: FileType;
}>();
</script>
