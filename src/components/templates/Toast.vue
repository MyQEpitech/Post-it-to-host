<template>
  <div id="toast" class="fixed -top-24 left-[50%] translate-x-[-50%] opacity-0 z-50">
    <div v-if="toaster.toastType.includes('Error')" class="flex items-center gap-4 bg-red-600 p-4 rounded-lg text-white">
      <ErrorIcon />
      <span
        v-if="toaster.toastType === 'fetchError'"
        class="w-fit max-w-64 font-outfit font-semibold text-lg text-center"
        >Couldn't get data. Please check your internet connection</span
      >
      <span
        v-if="toaster.toastType === 'notFoundError'"
        class="w-fit max-w-64 font-outfit font-semibold text-lg text-center"
        >Couldn't find note</span
      >
      <span
        v-if="toaster.toastType === 'noteTitleError'"
        class="w-fit max-w-64 font-outfit font-semibold text-lg text-center"
        >A note title should contain between 4 and 110 characters.</span
      >
      <span
        v-if="toaster.toastType === 'noteContentError'"
        class="w-fit max-w-64 font-outfit font-semibold text-lg text-center"
        >A note content should contain between 4 and 1500 characters.</span
      >
    </div>
    <div v-else class="flex items-center gap-4 bg-[#94d0db] p-4 rounded-lg text-white">
      <TrashIcon v-if="toaster.toastType === 'delete'" />
      <SuccessIcon v-else />
      <span
        v-if="toaster.toastType === 'create'"
        class="w-fit max-w-64 font-outfit font-semibold text-lg text-center"
        >New note created</span
      >
      <span
        v-if="toaster.toastType === 'update'"
        class="w-fit max-w-64 font-outfit font-semibold text-lg text-center"
        >Note updated</span
      >
      <span
        v-if="toaster.toastType === 'delete'"
        class="w-fit max-w-64 font-outfit font-semibold text-lg text-center"
        >Note deleted</span
      >
    </div>
  </div>
</template>

<script setup>
import { UseToaster } from '@/stores/toaster'
import SuccessIcon from '@/components/icons/SuccessIcon.vue'
import TrashIcon from '../icons/TrashIcon.vue'
import ErrorIcon from '../icons/ErrorIcon.vue'

let toaster = UseToaster()
</script>

<style scoped>
.toast {
  animation: toast-move 3s linear;
}

@keyframes toast-move {
  10% {
    top: -32px;
    opacity: 20%;
  }
  15% {
    top: 32px;
    opacity: 40%;
  }
  20% {
    top: 96px;
    opacity: 60%;
  }
  90% {
    top: 96px;
    opacity: 80%;
  }
  100% {
    top: -96px;
    opacity: 0;
  }
}
</style>
