<template>
  <main class="flex-grow flex justify-center lg:grid md:grid-cols-4 lg:grid-cols-6 mt-4 lg:mt-8">
    <div
      class="h-fit lg:col-start-2 lg:col-end-6 w-full relative m-4 md:m-8 mb-8 bg-[#cae8ed] rounded-lg p-4 md:p-8 md:pl-16 lg:p-32"
    >
      <div class="absolute top-0 right-0 h-fit w-fit flex">
        <div
          class="h-0 w-0 border-t-[100px] border-l-[100px] lg:border-t-[175px] lg:border-l-[175px] border-t-white border-b-transparent border-l-[#bfe3e9]"
        ></div>
      </div>
      <div v-if="onLoad" class="h-[30vh] flex justify-center items-center">
        <div
          class="relative w-16 h-16 animate-spin rounded-full bg-gradient-to-r from-red-300 via-blue-200 to-orange-200"
        >
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#cae8ed] rounded-full"
          ></div>
        </div>
      </div>
      <div v-else class="h-full flex flex-col gap-8 md:gap-12">
        <div
          class="w-8/12 md:w-9/12 flex justify-between py-4 border-b-2 border-gray-700 font-outfit font-semibold text-xl md:text-2xl"
        >
          <span v-if="!onEditMode" class="break-all">{{ note.title }}</span>
          <input
            v-else
            type="text"
            class="w-full bg-transparent focus:outline-none"
            v-model="note.title"
          />
          <button v-if="!onEditMode" @click="toggleEditMode"><EditIcon class="md:size-8" /></button>
        </div>
        <div class="md:w-9/12 text-gray-800 md:text-lg mb-auto">
          <span v-if="!onEditMode" class="break-all">{{ note.content[0] }}</span>
          <textarea
            v-else
            rows="5"
            class="w-full bg-transparent p-2 border-2 border-gray-700 rounded-lg"
            v-model="note.content[0]"
          ></textarea>
        </div>
        <div v-if="!onEditMode" class="md:w-9/12 flex justify-between items-center">
          <div class="flex gap-4 items-center text-gray-600 pb-4">
            <ClockIcon class="size-6" />
            <span>{{
              note.updatedAt.substring(0, 10) + ' ' + note.updatedAt.substring(11, 16)
            }}</span>
          </div>
          <button
            @click="deleteNote()"
            class="p-2 md:p-4 bg-red-300 text-gray-900 rounded-md lg:rounded-lg flex gap-2 items-center"
          >
            <TrashIcon />
            <span class="hidden md:inline">Delete</span>
          </button>
        </div>
        <div v-else class="md:w-9/12 flex justify-between">
          <button @click="updateNote()" class="p-2 md:p-4 bg-[#94d0dba9] rounded-md lg:rounded-lg">
            <span>Update</span>
          </button>
          <button
            @click="toggleEditMode()"
            class="p-2 md:p-4 bg-transparent border-2 border-[#a9d9e2] text-gray-900 rounded-md lg:rounded-lg"
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useNotesStore } from '@/stores/notes'
import { UseToaster } from '@/stores/toaster'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import EditIcon from '@/components/icons/EditIcon.vue'
import ClockIcon from '@/components/icons/ClockIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import router from '@/router'

let onLoad = ref(true)
let note = ref(null)
let onEditMode = ref(false)

let store = useNotesStore()
let toaster = UseToaster()
let route = useRoute()

const toggleEditMode = () => {
  onEditMode.value = !onEditMode.value
}

const getNote = async () => {
  let foundNote = await store.fetchNote(route.params.id)
  if (foundNote) {
    note.value = store.selectedNote
    onLoad.value = false
  } else {
    router.push('/')
    toaster.triggerToast('notFoundError')
  }
  return foundNote
}

const updateNote = async () => {
  if (note.value.title.trim().length > 4 && note.value.title.trim().length <= 110) {
    if (note.value.content[0].trim().length > 4 && note.value.content[0].trim().length <= 1500) {
      const requestOk = await store.updateNote(note.value)
      if (requestOk) {
        toggleEditMode()
        setTimeout(() => {
          toaster.triggerToast('update')
        }, 500)
      } else {
        getNote()
      }
    } else {
      toaster.triggerToast('noteContentError')
    }
  } else {
    toaster.triggerToast('noteTitleError')
  }
}

const deleteNote = async () => {
  const requestOk = await store.deleteNote(route.params.id)
  if (requestOk) {
    router.push('/')
    setTimeout(() => {
      toaster.triggerToast('delete')
    }, 500)
  } else {
    getNote()
  }
}

onBeforeMount(async () => {
  getNote()
})
</script>
