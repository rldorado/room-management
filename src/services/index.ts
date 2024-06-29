import axios from 'axios'

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
      data: [
        {
          id: 1,
          name: 'Sala 1',
          floor: 1,
          capacity: 4,
          occupancy: 2
        },
        {
          id: 2,
          name: 'Sala 2',
          floor: 2,
          capacity: 3,
          occupancy: 1
        }
      ]
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
