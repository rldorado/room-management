import type Room from '@/models/Room'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://apimocha.com/alvatross-rooms',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Parse data from server
const createRoomsFromServer = (data: any): Room[] => {
  const rooms: Room[] = []
  if (Array.isArray(data)) {
    data.forEach((room: any) => {
      rooms.push({
        id: room.id,
        floor: room.floor,
        capacity: room.capacity,
        occupancy: room.occupancy
      })
    })
  } else if (Array.isArray(data.rooms)) {
    data.rooms.forEach((room: any) => {
      rooms.push({
        id: room.id,
        floor: room.floor,
        capacity: room.capacity,
        occupancy: room.occupancy
      })
    })
  }
  return rooms
}

export default {
  async fetchRooms(): Promise<Room[]> {
    try {
      const { data } = await apiClient.get('/rooms')
      return createRoomsFromServer(data)
    } catch (error) {
      console.error('Error fetching rooms:', error)
      throw error
    }
  }
}
