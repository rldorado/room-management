<script setup lang="ts">
import RoomCard from '@/components/RoomCard.vue'
import type Room from '@/models/Room'

defineProps({
  loading: {
    type: Boolean,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  rooms: {
    type: Array as () => Room[],
    required: true
  }
})

const emit = defineEmits(['add', 'edit', 'delete'])

/**
 * Emits an 'add' event with the given room object.
 *
 * @param {Room} room - The room object to be added.
 * @return {void} This function does not return anything.
 */
const addRoom = (room: Room) => {
  emit('add', room)
}

/**
 * Updates a room by emitting an 'edit' event with the given room object.
 *
 * @param {Room} room - The room object to be updated.
 * @return {void} This function does not return anything.
 */
const updateRoom = (room: Room) => {
  emit('edit', room)
}

/**
 * Emits a 'delete' event with the given room object.
 *
 * @param {Room} room - The room object to be deleted.
 * @return {void} This function does not return anything.
 */
const deleteRoom = (room: Room) => {
  emit('delete', room)
}
</script>

<template>
  <v-card outlined class="floor-card pa-4">
    <v-card-title class="d-flex justify-space-between align-center">
      <span class="text-title-1 font-weight-bold">Planta {{ floor }}</span>
      <v-btn class="text-none" @click="addRoom">Añadir sala</v-btn>
    </v-card-title>
    <v-card-text>
      <div v-if="loading" class="d-flex justify-center align-center" style="height: 200px">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else class="rooms-container">
        <RoomCard
          v-for="room in rooms"
          :key="room.id"
          :room="room"
          @edit="updateRoom"
          @delete="deleteRoom"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
.floor-card {
  border-radius: $border-radius-container;
  border: 2px solid;
}

.rooms-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
