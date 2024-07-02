import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

export const useWSStore = defineStore('WS', () => {
  const { apiBase } = useRuntimeConfig().public
  const socket = ref()
  const count = ref(0)
  const isChange = ref(false)

  function connection() {
    socket.value = io(apiBase, {
      transports: ['websocket']
    })
    socket.value.emit('getUnRead')
  }

  function getUnRead() {
    if (socket.value) {
      socket.value.on('unRead', (data: any) => {
        console.log('WS', data)

        isChange.value = data.results.isChange || false
        count.value = data.results.count || 0
      })
    }
  }

  return { socket, connection, getUnRead, count, isChange }
})
