import axios from 'axios'
import mock from './mock_db.json'

const apiClient = axios.create({
  baseURL: 'https://apimocha.com/alvatross-rooms',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Create a Promise that will resolve with a mock response instead the apiClient one of Axios
const mockResponse = new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      data: [...mock.rooms]
    })
  }, 2000)
})

export default {
  async fetchRooms() {
    try {
      return await mockResponse
    } catch (error) {
      console.error('Error fetching rooms:', error)
      throw error
    }
  }
}
