<template>
  <div class="x-container x-mx-auto x-py-10 x-px-4">
    <ChooseFile
      :type="files.length ? 'button' : 'div'"
      class="x-mb-5"
      :class="{ invisible: status !== 'starting' }"
      @file-added="addFile"
    />

    <div class="file-list x-mb-5" v-if="files.length">
      <File
        v-for="file in files"
        :key="file.id"
        :file="file"
        :show-close-btn="status === 'starting'"
        @change-format="changeFormat(file, $event)"
        @remove-file="removeFile"
      />
    </div>

    <div class="x-flex x-items-center x-justify-between x-gap-16">
      <div class="x-flex-1 x-text-left">
        <strong
          v-if="status === 'processing'"
          class="x-min-w-[6rem] x-text-green-600"
        >
          Processing...
        </strong>

        <div
          class="x-flex x-w-full x-items-center x-gap-5"
          v-if="status === 'uploading'"
        >
          <strong class="x-min-w-[6rem]"> Uploading </strong>

          <div class="x-flex-1 x-rounded-full x-bg-gray-200 dark:x-bg-gray-700">
            <div
              class="loader x-rounded-full x-bg-blue-600 x-p-0.5 x-text-center x-text-xs x-font-medium x-leading-none x-text-blue-100"
              :style="{ width: uploadProgress + '%' }"
            >
              {{ uploadProgress + "%" }}
            </div>
          </div>
        </div>

        <a
          v-if="status === 'done'"
          href=""
          class="x-button outlined"
          target="_blank"
        >
          Convert more files
        </a>
      </div>

      <button
        v-if="files.length"
        @click="status === 'done' ? download(downloadUrl) : convert()"
        type="button"
        class="x-button"
      >
        <template v-if="status === 'uploading' || status === 'processing'">
          <svg
            role="status"
            class="x-mr-3 x-inline x-h-4 x-w-4 x-animate-spin x-text-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          {{ status === "uploading" ? "Converting" : "Processing" }}
        </template>

        <template v-if="status === 'done'"> Download </template>

        <template v-if="status === 'starting'">
          Convert
          <svg
            aria-hidden="true"
            class="x-ml-2 -x-mr-1 x-h-5 x-w-5"
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
        </template>
      </button>
    </div>
  </div>

  <transition name="modal">
    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:body>
        <div>
          <h1 class="x-text-lg x-font-semibold">Premium Fetaure</h1>
          <p>You cannot convert more than 3 files in a same day for free</p>
        </div>
        <a :href="settings.link">
          <img :src="BASE_URL + settings.promoImage" />
        </a>
      </template>
    </Modal>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";
import ChooseFile from "./components/ChooseFile.vue";
import Modal from "./components/Modal.vue";
import File from "./components/File.vue";
import { FileType } from "./types";
import axios from "axios";
import { injectAssets } from "./helpers";
injectAssets();

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const MAX_FILE_COUNT = 4;
const BASE_URL = "https://convert.7-cats.com";
// const BASE_URL = "http://localhost:3000";

const files = ref<FileType[]>([]);
const status = ref<"uploading" | "processing" | "done" | "starting">(
  "starting"
);
const uploadProgress = ref<number>(0);
const downloadUrl = ref<string>("");

const settings = ref<{ promoImage?: string; link?: string }>({});

const showModal = ref(false);

const addFile = (file: FileType) => {
  if (isLimitExceeded([...files.value, file])) {
    Toastify({
      text: "File limit exceeded. Max 3 files and 500MB allowed.",
      duration: 3000,
    }).showToast();
    return;
  }
  files.value.push(file);
};

const removeFile = (file: FileType) => {
  files.value = files.value.filter((f) => f.id !== file.id);
};

const changeFormat = (file: FileType, format: string) => {
  files.value = files.value.map((f) => {
    if (f.id === file.id) {
      return { ...f, convertTo: format };
    }
    return f;
  });
};

const isLimitExceeded = (files: FileType[]) => {
  const isCountExceeded = files.length > MAX_FILE_COUNT;
  // const isSizeExceeded =
  //   files.reduce((acc, file) => acc + file.size, 0) >= MAX_FILE_SIZE;

  let isSizeExceeded = false;

  files.forEach((file) => {
    if (file.size > MAX_FILE_SIZE) {
      isSizeExceeded = true;
    }
  });

  return isCountExceeded || isSizeExceeded;
};

const getSettings = () => {
  axios.get(`${BASE_URL}/public/settings-audio.json`).then(({ data }) => {
    settings.value = data;
  });
};

getSettings();

const convert = async () => {
  if (!files.value.length || status.value !== "starting") return;
  const payload = new FormData();

  files.value.forEach(({ file, convertTo }) => {
    payload.append("media", file as File);
    payload.append("formatTo", convertTo as string);
  });

  axios
    .post(
      `${BASE_URL}/upload`,
      { totalFiles: files.value.length },
      { withCredentials: true }
    )
    .then(({ data: uploadData }) => {
      status.value = "uploading";
      axios
        .post(`${BASE_URL}/convert/${uploadData.id}`, payload, {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.round((loaded * 100) / total);

            uploadProgress.value = percent;
            console.log(percent);
          },
        })
        .then(({ data }) => {
          status.value = "processing";

          isFileReadyPing(data.ping_url).then((url) => {
            console.log("file ready", url);
            status.value = "done";
            downloadUrl.value = url;
          });
        });
    })
    .catch((err) => {
      const { response } = err;
      if (response.status === 400) {
        showModal.value = true;
      }
    });
};

const isFileReadyPing = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      axios.post(url, { nof: files.value.length }).then(({ data }) => {
        if (data.status === "ready") {
          clearInterval(interval);
          console.log("done", data);
          resolve(data.download_url);
        }
      });
    }, 1000);
  });
};

const download = (url: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = "";
  a.click();
};
</script>

<style scoped>
.x-button {
  @apply x-inline-flex;
  @apply x-min-w-[10rem];
  @apply x-items-center;
  @apply x-justify-center;
  @apply x-rounded-lg;
  @apply x-bg-blue-700;
  @apply x-px-5;
  @apply x-py-2.5;
  @apply x-text-center;
  @apply x-text-sm;
  @apply x-font-medium;
  @apply x-text-white;
  @apply hover:x-bg-blue-800;
  @apply focus:x-outline-none;
  @apply focus:x-ring-4;
  @apply focus:x-ring-blue-300;
  @apply dark:x-bg-blue-600;
  @apply dark:hover:x-bg-blue-700;
  @apply dark:focus:x-ring-blue-800;
  border: none;
}

.outlined {
  @apply x-outline;
  @apply x-outline-2;
  @apply x-outline-offset-[-1.5px];
  @apply x-bg-transparent;
  @apply x-outline-blue-700;
  @apply x-text-blue-700;
  @apply dark:x-outline-blue-600;
  @apply hover:x-bg-blue-700;
  @apply hover:x-text-white;
}

.loader {
  /* width transition */
  transition: 0.3s;
}
</style>
