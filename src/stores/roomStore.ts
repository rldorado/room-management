import type Room from '@/models/Room'
import { defineStore } from 'pinia'
import roomsApi from '@/services'
import { ref } from 'vue'

const useRoomStore = defineStore('roomStore', () => {
  // State
  const rooms = ref<Room[]>([])
  const selectedFloor = ref<number>(1)
  const loading = ref<boolean>(false)

  // Actions
  const fetchRooms = async () => {
    loading.value = true
    try {
      const response = await roomsApi.fetchRooms()
      rooms.value = response.data
    } catch (error) {
      console.error('Error fetching rooms:', error)
    } finally {
      loading.value = false
    }
  }

  const setSelectedFloor = (floor: number) => {
    selectedFloor.value = floor
  }

  // CRUD operations

  const addRoom = (room: Room) => {
    rooms.value.push(room)
  }

  const updateRoom = (room: Room) => {
    const index = rooms.value.findIndex((r) => r.id === room.id)
    if (index !== -1) {
      rooms.value[index] = room
    }
  }

  const deleteRoom = (id: number) => {
    const index = rooms.value.findIndex((r) => r.id === id)
    if (index !== -1) {
      rooms.value.splice(index, 1)
    }
  }

  return {
    rooms,
    selectedFloor,
    loading,
    fetchRooms,
    setSelectedFloor,
    addRoom,
    updateRoom,
    deleteRoom
  }
})

export default useRoomStore
