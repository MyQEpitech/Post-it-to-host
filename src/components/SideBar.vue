<template>
  <div>
    <div class="flex flex-col gap-4">
      <button @click="store.togglePostPanel()" class="flex gap-2 lg:gap-4 items-center">
        <div class="relative">
          <NewNoteIcon />
          <PlusIcon
            class="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-white"
          />
        </div>
        <span class="text-lg font-outfit">New note</span>
      </button>
      <div class="flex flex-col gap-4">
        <button class="h-6 w-6 bg-red-300 rounded-full"></button>
        <button class="h-6 w-6 bg-blue-200 rounded-full"></button>
        <button class="h-6 w-6 bg-[#94d0db] rounded-full"></button>
        <button class="h-6 w-6 bg-orange-200 rounded-full"></button>
      </div>
    </div>
    <div class="w-full flex justify-between flex-wrap mt-8 select-none">
      <button v-if="store.currentPage > 1" @click="store.decrementPageIndex()"><ArrowLeftIcon /></button>
      <ArrowLeftIcon v-else/>
      <span class="px-3 bg-[#eaf6f8]">{{ store.currentPage }}</span>
      <button @click="store.incrementPageIndex()" v-if="store.currentPage < store.notes.length"><ArrowRightIcon /></button>
      <ArrowRightIcon v-else/>
    </div>
  </div>
</template>

<script setup>
import PlusIcon from './icons/PlusIcon.vue'
import ArrowLeftIcon from './icons/ArrowLeftIcon.vue';
import ArrowRightIcon from './icons/ArrowRightIcon.vue';
import NewNoteIcon from './icons/NewNoteIcon.vue'
import { useNotesStore } from '@/stores/notes'

let store = useNotesStore()
</script>
