<template>
  <RouterLink
    :to="{ name: 'details', params: { id: note._id } }"
    class="max-h-64 flex flex-col gap-2 p-4 rounded-lg"
    :class="colors[getColorIndex()]"
  >
    <span class="font-outfit font-semibold capitalize pb-2 border-b border-gray-700 break-all">{{
      note.title
    }}</span>
    <span class="text-sm text-gray-700 mb-auto break-all"
      >{{ (note.content[0].length <= 150) ? note.content[0] : note.content[0].substring(0, 150) + "..." }}
    </span>
    <div class="flex gap-2 items-center">
      <ClockIcon />
      <span class="text-xs text-gray-600">{{
        note.updatedAt.substring(0, 10) + ' ' + note.updatedAt.substring(11, 16)
      }}</span>
    </div>
  </RouterLink>
</template>

<script setup>
import ClockIcon from '@/components/icons/ClockIcon.vue'
import { RouterLink } from 'vue-router'

defineProps({
  note: Object
})

let colors = ['bg-red-300', 'bg-blue-200', 'bg-[#94d0db]', 'bg-orange-200']

const getColorIndex = () => {
  let index = Math.floor(Math.random() * 4)
  return index
}
</script>
