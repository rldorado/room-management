<script setup lang="ts">
import FloorCard from '@/components/FloorCard.vue'
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
  <v-container fluid>
    <h1 class="text-h4 font-weight-bold mb-6">Salas</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="store.selectedFloor"
          :items="floors"
          label="Planta"
          class="mb-6"
          hide-details
          variant="outlined"
          dense
          @change="onFloorChange"
        ></v-select>
      </v-col>
    </v-row>
    <hr class="mb-6" />
    <FloorCard
      :loading="store.loading"
      :rooms="store.rooms"
      :floor="store.selectedFloor"
      @add="store.addRoom"
      @edit="store.updateRoom"
    />
  </v-container>
</template>
