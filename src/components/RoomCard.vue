<script setup lang="ts">
import type Room from '@/models/Room'
import { ref } from 'vue'

const props = defineProps({
  room: {
    type: Object as () => Room,
    required: true
  }
})

const room = ref<Room>({ ...props.room })

const emit = defineEmits(['edit', 'delete'])

const editRoom = () => {
  emit('edit', room.value)
}

const deleteRoom = () => {
  emit('delete', room.value)
}
</script>

<template>
  <v-card class="room-card pa-2" outlined>
    <v-card-title class="text-subtitle-1 font-weight-bold pb-4">
      Sala planta {{ room.floor }}
    </v-card-title>
    <v-card-text>
      <label for="capacity" class="text-body-2 font-weight-bold">Capacidad máxima</label>
      <v-text-field
        id="capacity"
        v-model="room.capacity"
        type="number"
        dense
        variant="outlined"
        hide-details
        class="mb-4"
      ></v-text-field>
      <label for="occupancy" class="text-body-2 font-weight-bold">Ocupación</label>
      <v-text-field
        id="occupancy"
        v-model="room.occupancy"
        type="number"
        append-inner-icon="mdi-percent"
        dense
        variant="outlined"
        hide-details
        class="mb-2"
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="flex justify-end">
      <v-btn class="text-none" small @click="editRoom">Modificar</v-btn>
      <v-btn class="text-none" small @click="deleteRoom">Eliminar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="scss">
.room-card {
  background-color: $blue-light;
  border-radius: $border-radius-container;
}
</style>
