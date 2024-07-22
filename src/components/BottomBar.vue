<template>
  <div class="flex flex-col items-center justify-evenly py-8">
    <button
      @click="store.togglePostPanel()"
      class="relative bg-[#94d0db] p-3 rounded-full shadow-2xl"
    >
      <NewNoteIcon />
      <PlusIcon
        class="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-[#94d0db]"
      />
    </button>
    <div class="w-full flex gap-8 justify-center">
      <button class="h-6 w-6 bg-red-300 rounded-full"></button>
      <button class="h-6 w-6 bg-blue-200 rounded-full"></button>
      <button class="h-6 w-6 bg-[#94d0db] rounded-full"></button>
      <button class="h-6 w-6 bg-orange-200 rounded-full"></button>
    </div>
  </div>
</template>

<script setup>
import PlusIcon from './icons/PlusIcon.vue'
import NewNoteIcon from './icons/NewNoteIcon.vue'
import { useNotesStore } from '@/stores/notes'

let store = useNotesStore()
</script>
