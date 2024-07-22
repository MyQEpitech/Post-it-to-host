import { defineStore } from 'pinia'

export const UseToaster = defineStore('toaster', {
  state: () => ({
    toastType: ''
  }),
  actions: {
    triggerToast(toastType) {
      this.toastType = toastType
      const toast = document.getElementById('toast')
      toast.classList.add('toast')
      setTimeout(() => {
        toast.classList.remove('toast')
      }, 3000)
    }
  }
})
