<script setup lang="ts">
import RoomCard from '@/components/RoomCard.vue'
import useSnackbar from '@/composables/useSnackbar'
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

const { snackbar, snackbarText, showSnackbar } = useSnackbar()

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
  showSnackbar('Sala actualizada con exito')
}

/**
 * Deletes a room by emitting a 'delete' event with the given room id.
 *
 * @param {number} id - The id of the room to be deleted.
 * @return {void} This function does not return anything.
 */
const deleteRoom = (id: number) => {
  emit('delete', id)
  showSnackbar('Sala eliminada con exito')
}
</script>

<template>
  <div class="bg-white border-2 border-gray-200 rounded-3xl p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Planta {{ floor }}</h2>
      <button
        class="bg-blue-dark text-white px-4 py-2 rounded-xl hover:bg-blue-800"
        @click="addRoom"
      >
        Añadir sala
      </button>
    </div>
    <div v-if="loading" class="flex justify-center items-center h-52">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900" />
    </div>
    <div v-else class="flex flex-wrap gap-4">
      <RoomCard
        v-for="room in rooms"
        :key="room.id"
        :room="room"
        @edit="updateRoom"
        @delete="deleteRoom"
      />
    </div>
    <transition name="fade">
      <div
        v-if="snackbar"
        class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
      >
        {{ snackbarText }}
      </div>
    </transition>
  </div>
</template>
