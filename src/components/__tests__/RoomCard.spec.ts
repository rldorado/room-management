import { mount } from '@vue/test-utils'
import RoomCard from '@/components/RoomCard.vue'
import { describe, it, expect } from 'vitest'

describe('RoomCard.vue', () => {
  const mockRoom = {
    id: 1,
    floor: 1,
    capacity: 20,
    occupancy: 50
  }

  it('renders room details correctly', () => {
    const wrapper = mount(RoomCard, {
      props: {
        mockRoom
      }
    })

    expect(wrapper.find('h2').text()).toContain('Sala planta 1')
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
  })

  // it('emits edit event when edit button is clicked', async () => {
  //   const wrapper = mount(RoomCard, {
  //     props: {
  //       mockRoom
  //     }
  //   })

  //   await wrapper.find('button').trigger('click')
  //   expect(wrapper.emitted('edit')).toBeTruthy()
  // })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = mount(RoomCard, {
      props: {
        room: mockRoom
      }
    })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })

  it('validates input fields', async () => {
    const wrapper = mount(RoomCard, {
      props: {
        room: mockRoom
      }
    })
    await wrapper.find('input[type="number"]').setValue('')
    expect(wrapper.find('.text-red-500').exists()).toBe(true)
  })
})
