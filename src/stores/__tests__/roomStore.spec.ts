import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import useRoomStore from './../roomStore'

const rooms = [{ id: 1, floor: 1, capacity: 10, occupancy: 50 }]

vi.mock('@/services', () => ({
  default: {
    fetchRooms: vi.fn(() => Promise.resolve({ data: rooms }))
  }
}))

describe('roomStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('fetches rooms from local storage and stores them', async () => {
    const store = useRoomStore()

    // Mock local storage
    localStorage.setItem('rooms', JSON.stringify(rooms))

    // Fetch rooms from local storage
    await store.fetchRooms()
    expect(store.rooms.length).toBe(1)
    expect(localStorage.getItem('rooms')).toBeTruthy()
  })

  it('adds a room', () => {
    const store = useRoomStore()
    store.addRoom()
    expect(store.rooms.length).toBe(1)
    expect(localStorage.getItem('rooms')).toBeTruthy()
  })

  it('updates a room', () => {
    const store = useRoomStore()
    store.rooms = [{ id: 1, floor: 1, capacity: 10, occupancy: 50 }]
    store.updateRoom({ id: 1, floor: 1, capacity: 20, occupancy: 75 })
    expect(store.rooms[0].capacity).toBe(20)
    expect(localStorage.getItem('rooms')).toBeTruthy()
  })

  it('deletes a room', () => {
    const store = useRoomStore()
    store.rooms = [{ id: 1, floor: 1, capacity: 10, occupancy: 50 }]
    store.deleteRoom(1)
    expect(store.rooms.length).toBe(0)
    expect(localStorage.getItem('rooms')).toBeTruthy()
  })
})
