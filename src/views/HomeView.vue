<script setup lang="ts">
import RoomCard from '@/components/RoomCard.vue'
import type Room from '@/models/Room'
import useRoomStore from '@/stores/roomStore'
import { computed, onMounted } from 'vue'

const store = useRoomStore()

onMounted(() => {
  store.fetchRooms()
})

const floors = computed(() => store.rooms.map((room: Room) => room.floor))

const onFloorChange = (floor: number) => {
  store.setSelectedFloor(floor)
}
</script>

<template>
  <v-select
    v-model="store.selectedFloor"
    :items="floors"
    label="Planta"
    class="mb-4"
    @change="onFloorChange"
  ></v-select>
  <div class="d-flex justify-end mb-4">
    <v-btn color="primary" class="bg-blue-600 text-white" @click="store.addRoom">
      Añadir sala
    </v-btn>
  </div>
  <div class="room-list">
    <RoomCard v-for="room in store.rooms" :key="room.id" :room="room" @edit="store.updateRoom" />
  </div>
</template>

<style scoped>
.room-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
