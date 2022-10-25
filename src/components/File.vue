<template>
  <div class="file-list-item x-grid x-grid-cols-2 x-gap-5">
    <div class="x-truncate">{{ file.name }}</div>
    <div class="x-flex x-justify-between x-gap-4">
      <p>{{ hrFileSize(file.size) }}</p>
      <p>{{ file.type }}</p>

      <select v-model="formatTo" :disabled="!showCloseBtn">
        <!-- <optgroup label="Video">
          <option value="avi">avi</option>
          <option value="flv">flv</option>
          <option value="webm">webm</option>
          <!- - <option value="3gp">3gp</option> -- >
          <option value="mkv">mkv</option>
          <option value="mp4">mp4</option>
          <option value="ogv">ogv</option>
          <option value="mov">mov</option>
          <option value="wmv">wmv</option>
        </optgroup> -->
        <optgroup label="Audio">
          <option value="flac">FLAC</option>
          <option value="aiff">AIFF</option>
          <option value="alac">ALAC</option>
          <option value="mp3">MP3</option>
          <option value="m4a">M4a</option>
          <option value="ogg">OGG</option>
          <option value="wav">WAV</option>
          <option value="amr">AMR</option>
          <option value="wma">WMA</option>
          <option value="aac">AAC</option>
        </optgroup>
      </select>

      <button v-if="showCloseBtn" @click="removeFile(file)">
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
          class="x-feather x-feather-x-circle"
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
  showCloseBtn: boolean;
}>();

const emit = defineEmits(["change-format", "remove-file"]);

const formatTo = ref("mp3");

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
