import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import useFilters from './../useFilters'
import type Room from '@/models/Room'

vi.mock('@/stores/roomStore', () => ({
  default: () => ({
    rooms: [
      { id: 1, floor: 1, capacity: 10, occupancy: 50 },
      { id: 2, floor: 2, capacity: 20, occupancy: 75 },
      { id: 3, floor: 1, capacity: 15, occupancy: 60 }
    ],
    selectedFloor: 1
  })
}))

describe('useFilters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('returns available floors', () => {
    const { floorsAvailable } = useFilters()
    expect(floorsAvailable.value).toEqual([1, 2])
  })

  it('returns filtered rooms based on selected floor', () => {
    const { filteredRooms } = useFilters()
    expect(filteredRooms.value.length).toBe(2)
    expect(filteredRooms.value.every((room: Room) => room.floor === 1)).toBe(true)
  })
})
