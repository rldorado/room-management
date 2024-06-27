import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://apimocha.com/alvatross-rooms',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async fetchRooms() {
    try {
      return await apiClient.get('/rooms')
    } catch (error) {
      console.error('Error fetching rooms:', error)
      throw error
    }
  }
}
