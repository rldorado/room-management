<script setup lang="ts">
import FloorCard from '@/components/FloorCard.vue'
import useFilters from '@/composables/useFilters'
import useRoomStore from '@/stores/roomStore'
import { onMounted } from 'vue'

const store = useRoomStore()
const { floorsAvailable, filteredRooms } = useFilters()

onMounted(() => {
  store.fetchRooms()
})
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-6">Salas</h1>
    <div class="mb-6" v-if="floorsAvailable">
      <label for="floor-select" class="block text-sm font-medium text-gray-700"> Planta </label>
      <select
        id="floor-select"
        v-model="store.selectedFloor"
        class="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg"
      >
        <option v-for="floor in floorsAvailable" :key="floor" :value="floor">
          {{ floor }}
        </option>
      </select>
    </div>
    <div v-else>No floors available</div>
    <hr class="mb-6" />
    <FloorCard
      :loading="store.loading"
      :rooms="filteredRooms"
      :floor="store.selectedFloor"
      @add="store.addRoom"
      @edit="store.updateRoom"
      @delete="store.deleteRoom"
    />
  </div>
</template>
