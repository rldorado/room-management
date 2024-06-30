import type Room from '@/models/Room'
import useRoomStore from '@/stores/roomStore'
import { computed } from 'vue'

export const useFilters = () => {
  const store = useRoomStore()

  // Get unique floors from all rooms
  const floorsAvailable = computed(() => {
    return Array.from(new Set(store.rooms.map((room: Room) => room.floor))) || []
  })

  const filteredRooms = computed(() => {
    return store.rooms.filter((room: Room) => room.floor === store.selectedFloor) || []
  })

  return {
    floorsAvailable,
    filteredRooms
  }
}

export default useFilters
