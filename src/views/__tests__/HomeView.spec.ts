import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from './../HomeView.vue'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/composables/useFilters', () => ({
  default: () => ({
    floorsAvailable: [1, 2, 3],
    filteredRooms: []
  })
}))

vi.mock('@/stores/roomStore', () => ({
  default: () => ({
    fetchRooms: vi.fn(),
    selectedFloor: 1,
    loading: false
  })
}))

describe('HomeView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.find('h1').text()).toBe('Salas')
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'FloorCard' }).exists()).toBe(true)
  })

  it('calls fetchRooms on mount', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.vm.store.fetchRooms).toHaveBeenCalled()
  })

  it('updates selectedFloor when select changes', async () => {
    const wrapper = mount(HomeView)
    await wrapper.find('select').setValue(2)
    expect(wrapper.vm.store.selectedFloor).toBe(2)
  })
})
