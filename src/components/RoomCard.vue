<script setup lang="ts">
import type Room from '@/models/Room'
import { ref } from 'vue'

const props = defineProps({
  room: {
    type: Object as () => Room,
    required: true
  }
})

const emit = defineEmits(['edit'])

const room = ref<Room>({ ...props.room })

const editRoom = () => {
  emit('edit', props.room)
}
</script>

<template>
  <v-card class="pa-4">
    <v-card-title>Sala planta {{ room.floor }}</v-card-title>
    <v-card-text>
      <v-text-field v-model="room.capacity" label="Capacidad máxima" type="number"></v-text-field>
      <v-text-field
        v-model="room.occupancy"
        label="Ocupación"
        type="number"
        append-icon="%"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="editRoom" class="bg-blue-600 text-white">Modificar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-card {
  width: 250px;
  border-radius: 26px;
  background-color: #f5f7fb;
}
.v-text-field {
  border-radius: 12px;
}
.v-btn {
  border-radius: 12px;
}
</style>
