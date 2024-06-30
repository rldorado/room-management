import type Room from '@/models/Room'
import { defineStore } from 'pinia'
import roomsApi from '@/services'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'rooms'

const useRoomStore = defineStore('roomStore', () => {
  // State
  const rooms = ref<Room[]>([])
  const selectedFloor = ref<number>(1)
  const loading = ref<boolean>(false)

  // Actions
  const fetchRooms = async () => {
    loading.value = true

    // Load rooms from local storage
    const cachedRooms = localStorage.getItem(STORAGE_KEY)
    if (cachedRooms) {
      rooms.value = JSON.parse(cachedRooms)
    } else {
      try {
        const response = await roomsApi.fetchRooms()
        rooms.value = response.data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms.value))
      } catch (error) {
        console.error('Error fetching rooms:', error)
      }
    }
    loading.value = false
  }

  // CRUD operations

  const addRoom = () => {
    const newRoom = {
      id: Math.floor(Math.random() * 1000),
      name: `Sala ${selectedFloor.value}`,
      floor: selectedFloor.value,
      occupancy: 0,
      capacity: 0
    }
    rooms.value.push(newRoom)

    // Save rooms to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms.value))
  }

  const updateRoom = (room: Room) => {
    const index = rooms.value.findIndex((r) => r.id === room.id)
    if (index !== -1) {
      rooms.value[index] = room

      // Save rooms to local storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms.value))
    }
  }

  const deleteRoom = (id: number) => {
    const index = rooms.value.findIndex((r) => r.id === id)
    if (index !== -1) {
      rooms.value.splice(index, 1)

      // Save rooms to local storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms.value))
    }
  }

  // Watch changes in rooms and update local storage
  watch(
    rooms,
    (newRooms) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newRooms))
    },
    { deep: true }
  )

  return {
    rooms,
    selectedFloor,
    loading,
    fetchRooms,
    addRoom,
    updateRoom,
    deleteRoom
  }
})

export default useRoomStore
