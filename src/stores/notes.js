import { defineStore } from 'pinia'
import { createNewNote, getNotes, getThisNote, updateNote, deleteNote } from '@/api'
import { UseToaster } from './toaster'
import router from '@/router'


export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    currentPage: 1,
    selectedNote: {},
    addingPost: false
  }),
  actions: {
    async fetchNotes() {
      let response = await getNotes()
      if(response === false){
        const toaster = UseToaster()
        toaster.triggerToast("fetchError")
      }else{
        this.notes = new Array(Math.ceil(response.length / 12)).fill().map(_=>response.splice(0, 12))
      }
      
    },
    async fetchNote(id) {
      let response = await getThisNote(id)
      const toaster = UseToaster()
      this.selectedNote = response;
      if (response === false) {
        return false;
      }
      return true;
    },
    togglePostPanel() {
      this.addingPost = !this.addingPost
    },
    async postNote(title, content) {
      return await createNewNote(title, content)
    },
    async updateNote(note) {
      return await updateNote(note)
    },
    async deleteNote(id) {
      return await deleteNote(id)
    },
    incrementPageIndex(){
      if (this.currentPage < this.notes.length) {
        this.currentPage++;
      }
    },
    decrementPageIndex(){
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    resetPageIndex(){
      this.currentPage = 1;
    }
  }
})
