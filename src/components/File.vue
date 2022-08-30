<template>
  <div class="file-list-item grid grid-cols-2 gap-5">
    <div class="truncate">{{ file.name }}</div>
    <div class="flex justify-between gap-4">
      <p>{{ hrFileSize(file.size) }}</p>
      <p>{{ file.type }}</p>

      <select v-model="formatTo">
        <optgroup label="Video">
          <option value="avi">avi</option>
          <option value="flv">flv</option>
          <option value="webm">webm</option>
          <option value="3gp">3gp</option>
          <option value="mkv">mkv</option>
          <option value="mp4">mp4</option>
          <option value="ogv">ogv</option>
          <option value="mov">mov</option>
          <option value="wmv">wmv</option>
        </optgroup>
        <optgroup label="Audio">
          <option value="flac">flac</option>
          <option value="aiff">aiff</option>
          <option value="alac">alac</option>
          <option value="mp3">mp3</option>
          <option value="m4a">m4a</option>
          <option value="ogg">ogg</option>
          <option value="wav">wav</option>
          <option value="amr">amr</option>
          <option value="wma">wma</option>
          <option value="aac">aac</option>
        </optgroup>
      </select>

      <button @click="removeFile(file)">
        <svg
          data-v-4f42a8f0=""
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x-circle"
        >
          <circle data-v-4f42a8f0="" cx="12" cy="12" r="10"></circle>
          <line data-v-4f42a8f0="" x1="15" y1="9" x2="9" y2="15"></line>
          <line data-v-4f42a8f0="" x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { hrFileSize } from "../helpers/human-readable-size";
import { FileType } from "./../types/index";

defineProps<{
  file: FileType;
}>();

const emit = defineEmits(["change-format", "remove-file"]);

const formatTo = ref("flv");

watch(formatTo, (value) => {
  value && onFormatChange(value);
});

onMounted(() => {
  onFormatChange(formatTo.value);
});

const onFormatChange = (format: string) => {
  console.log(format);
  emit("change-format", format);
};

const removeFile = (file: FileType) => {
  emit("remove-file", file);
};
</script>
