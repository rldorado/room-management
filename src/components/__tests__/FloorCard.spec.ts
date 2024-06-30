import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import FloorCard from './../FloorCard.vue'

vi.mock('@/composables/useSnackbar', () => ({
  default: () => ({
    snackbar: false,
    snackbarText: '',
    showSnackbar: vi.fn()
  })
}))

describe('FloorCard', () => {
  const mockRooms = [
    { id: 1, floor: 1, capacity: 10, occupancy: 50 },
    { id: 2, floor: 1, capacity: 20, occupancy: 75 }
  ]

  it('renders correctly', () => {
    const wrapper = mount(FloorCard, {
      props: {
        loading: false,
        floor: 1,
        rooms: mockRooms
      }
    })
    expect(wrapper.find('h2').text()).toContain('Planta 1')
    expect(wrapper.findAllComponents({ name: 'RoomCard' }).length).toBe(2)
  })

  it('shows loading spinner when loading is true', () => {
    const wrapper = mount(FloorCard, {
      props: {
        loading: true,
        floor: 1,
        rooms: []
      }
    })
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
  })

  it('emits add event when add button is clicked', async () => {
    const wrapper = mount(FloorCard, {
      props: {
        loading: false,
        floor: 1,
        rooms: []
      }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('add')).toBeTruthy()
  })

  it('emits edit event and shows snackbar when room is edited', async () => {
    const wrapper = mount(FloorCard, {
      props: {
        loading: false,
        floor: 1,
        rooms: mockRooms
      }
    })
    await wrapper.findComponent({ name: 'RoomCard' }).vm.$emit('edit', mockRooms[0])
    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.vm.showSnackbar).toHaveBeenCalledWith('Sala actualizada con exito')
  })

  it('emits delete event and shows snackbar when room is deleted', async () => {
    const wrapper = mount(FloorCard, {
      props: {
        loading: false,
        floor: 1,
        rooms: mockRooms
      }
    })
    await wrapper.findComponent({ name: 'RoomCard' }).vm.$emit('delete', 1)
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.vm.showSnackbar).toHaveBeenCalledWith('Sala eliminada con exito')
  })
})
