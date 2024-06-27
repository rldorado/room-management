import type Room from '@/models/Room'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import roomsApi from '@/services'

interface RoomState {
  rooms: Ref<Room[]>
  selectedFloor: Ref<number>
}

export const useRoomStore = defineStore('roomStore', () => {
  // State
  const state: RoomState = {
    rooms: ref([]),
    selectedFloor: ref(1)
  }
  const { rooms, selectedFloor } = state

  /**
   * Fetches rooms from the API and updates the 'rooms' reactive reference with the received data.
   *
   * @return {Promise<void>} A promise that resolves when the rooms are successfully fetched and the 'rooms' reference is updated.
   */
  const fetchRooms = async () => {
    const { data } = await roomsApi.fetchRooms()
    rooms.value = data
  }

  /**
   * Sets the selected floor in the room store to the specified floor number.
   *
   * @param {number} floor - The floor number to set as the selected floor.
   */
  const setSelectedFloor = (floor: number) => {
    selectedFloor.value = floor
  }

  // CRUD operations

  /**
   * Adds a new room to the list of rooms.
   *
   * @param {Room} room - The room to be added.
   * @return {void}
   */
  const addRoom = (room: Room) => {
    rooms.value.push(room)
  }

  /**
   * Updates a room in the list of rooms.
   *
   * @param {Room} room - The room object to be updated.
   * @return {void} This function does not return anything.
   */
  const updateRoom = (room: Room) => {
    const index = rooms.value.findIndex((r) => r.id === room.id)
    if (index !== -1) {
      rooms.value[index] = room
    }
  }

  /**
   * Deletes a room from the list of rooms based on the provided id.
   *
   * @param {number} id - The id of the room to be deleted.
   * @return {void} This function does not return anything.
   */
  const deleteRoom = (id: number) => {
    const index = rooms.value.findIndex((r) => r.id === id)
    if (index !== -1) {
      rooms.value.splice(index, 1)
    }
  }

  return {
    rooms,
    selectedFloor,
    fetchRooms,
    setSelectedFloor,
    addRoom,
    updateRoom,
    deleteRoom
  }
})

export default useRoomStore
