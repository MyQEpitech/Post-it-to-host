<template>
  <main
    class="flex-grow flex flex-col md:grid md:grid-cols-4 lg:grid-cols-6 mx-4 md:mx-0 mt-8 md:mr-8 md:transition"
  >
    <SideBar class="hidden md:block p-8" />
    <div
      class="flex-grow md:col-start-2 md:col-end-5 lg:col-start-2 lg:col-end-7 bg-[#eaf6f8] p-4 md:p-8 rounded-t-lg md:rounded-lg md:mb-8"
    >
      <div v-if="onLoad" class="h-full flex justify-center items-center">
        <div
          class="relative w-16 h-16 animate-spin rounded-full bg-gradient-to-r from-red-300 via-blue-200 to-orange-200"
        >
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#eaf6f8] rounded-full"
          ></div>
        </div>
      </div>
      <div v-else class="h-full flex justify-center">
        <div v-if="notes.length > 0" class="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <div
            v-if="store.addingPost"
            class="col-start-1 col-end-3 border-2 border-dotted border-gray-700 p-4 rounded-lg flex flex-col items-center gap-4"
          >
            <input
              type="text"
              v-model="newTitle"
              placeholder="Title"
              class="w-full py-2 bg-transparent border-b-2 border-gray-700 focus:outline-none font-outfit font-semibold"
            />
            <textarea
              cols="5"
              v-model="newContent"
              class="w-full bg-[#d4ecf1] p-2 text-gray-700 h-32 focus:outline-none"
            ></textarea>
            <button @click="createNote()" class="p-2 bg-black text-[#cae8ed] rounded-md">
              Add note
            </button>
          </div>
          <NoteCard
            class="select-none shadow-md hover:shadow-xl transition-all duration-300"
            v-for="note in notes[store.currentPage - 1]"
            :key="note.id"
            :note="note"
          />
        </div>
        <div v-else class="h-full w-full flex justify-center items-center">
          <div class="w-2/3 flex flex-col gap-4 items-center text-[#76a6af]">
            <EmptyFolderIcon />
            <span class="text-2xl md:text-3xl text-center">Nothing here for the moment</span>
          </div>
        </div>
      </div>
    </div>
    <BottomBar class="md:hidden bg-[#eaf6f8]" />
  </main>
</template>

<script setup>
import NoteCard from '@/components/NoteCard.vue'
import EmptyFolderIcon from '@/components/icons/EmptyFolderIcon.vue'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
import SideBar from '@/components/SideBar.vue'
import BottomBar from '@/components/BottomBar.vue'
import { onBeforeMount, ref } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { UseToaster } from '@/stores/toaster'

let onLoad = ref(true)
let notes = ref([])

let newTitle = ref('')
let newContent = ref('')

const store = useNotesStore()
const toaster = UseToaster()

const createNote = async () => {
  if (newTitle.value.trim().length > 4 && newTitle.value.trim().length <= 110) {
    if (newContent.value.trim().length > 4 && newContent.value.trim().length <= 1500) {
      const creationStatus = await store.postNote(newTitle.value, newContent.value)
      if (creationStatus) {
        await store.fetchNotes()
        newTitle.value = ''
        newContent.value = ''
        store.togglePostPanel()
        notes.value = store.notes
        store.resetPageIndex()
        setTimeout(() => {
          toaster.triggerToast('create')
        }, 500)
      }
    }
    else{
      toaster.triggerToast('noteContentError')
    }
  } else {
    toaster.triggerToast('noteTitleError')
  }
}

onBeforeMount(async () => {
  store.addingPost = false
  await store.fetchNotes()
  notes.value = store.notes
  onLoad.value = false
})
</script>
