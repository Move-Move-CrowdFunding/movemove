import { defineStore } from 'pinia'

export const useMessageModalStore = defineStore('message', () => {
  const isModalOpen = ref(false)
  const message = ref('警告彈窗內容')

  const toggleMessageModal = (content) => {
    message.value = content
  }
  return { isModalOpen, message, toggleMessageModal }
})
