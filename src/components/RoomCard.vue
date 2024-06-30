<script setup lang="ts">
import type Room from '@/models/Room'
import { ref, watch } from 'vue'

const props = defineProps({
  room: {
    type: Object as () => Room,
    required: true
  }
})

const room = ref<Room>({ ...props.room })
const errors = ref<[key: string]>({})

const validateField = (field: 'capacity' | 'occupancy') => {
  errors.value[field] = ''
  const value = room.value[field]
  if (!value) {
    errors.value[field] = 'Este campo es requerido'
  } else if (isNaN(Number(value))) {
    errors.value[field] = 'Debe ser un número'
  } else if (Number(value) <= 0) {
    errors.value[field] = 'Debe ser positivo'
  } else if (field === 'occupancy' && Number(value) > 100) {
    errors.value[field] = 'No puede tener un valor superior a 100'
  }
}

watch(
  () => room.value.capacity,
  () => validateField('capacity')
)
watch(
  () => room.value.occupancy,
  () => validateField('occupancy')
)

const emit = defineEmits(['edit', 'delete'])

/**
 * Updates a room by emitting an 'edit' event with the room's value.
 *
 * @return {void} This function does not return anything.
 */
const editRoom = () => {
  validateField('capacity')
  validateField('occupancy')
  if (!errors.value.capacity && !errors.value.occupancy) {
    emit('edit', room.value)
  }
}

/**
 * Deletes a room by emitting a 'delete' event with the room's ID.
 *
 * @return {void} This function does not return anything.
 */
const deleteRoom = () => {
  emit('delete', room.value.id)
}
</script>

<template>
  <div class="bg-blue-light rounded-3xl p-4 min-w-[300px] w-full md:w-auto">
    <h2 class="text-lg font-bold mb-4">Sala planta {{ room.floor }}</h2>
    <div class="mb-4">
      <label :for="`capacity-${room.id}`" class="block text-sm font-bold mb-1">
        Capacidad máxima
      </label>
      <input
        :id="`capacity-${room.id}`"
        v-model="room.capacity"
        type="number"
        class="w-full p-2 border border-gray-300 rounded-lg pr-8"
        :class="{ 'border-red-500': errors.capacity }"
      />
      <p v-if="errors.capacity" class="text-red-500 text-xs mt-1">
        {{ errors.capacity }}
      </p>
    </div>
    <div class="mb-4">
      <label :for="`occupancy-${room.id}`" class="block text-sm font-bold mb-1"> Ocupación </label>
      <div class="relative">
        <input
          :id="`occupancy-${room.id}`"
          v-model="room.occupancy"
          type="number"
          class="w-full p-2 border border-gray-300 rounded-lg pr-8"
          :class="{ 'border-red-500': errors.occupancy }"
        />
        <span class="absolute right-2 top-2">%</span>
      </div>
      <p v-if="errors.occupancy" class="text-red-500 text-xs mt-1">
        {{ errors.occupancy }}
      </p>
    </div>
    <div class="flex justify-end space-x-2">
      <button
        class="bg-blue-dark text-white px-5 py-3 rounded-xl hover:bg-blue-800 text-sm"
        @click="editRoom"
      >
        Modificar
      </button>
      <button
        class="bg-blue-dark text-white px-5 py-3 rounded-xl hover:bg-blue-800 text-sm"
        @click="deleteRoom"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
