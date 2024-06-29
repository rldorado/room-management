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
  <v-container fluid>
    <h1 class="text-h4 font-weight-bold mb-6">Salas</h1>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="store.selectedFloor"
          :items="floorsAvailable"
          label="Planta"
          class="mb-6"
          hide-details
          variant="outlined"
          dense
          @change="store.setSelectedFloor"
        ></v-select>
      </v-col>
    </v-row>
    <hr class="mb-6" />
    <FloorCard
      :loading="store.loading"
      :rooms="filteredRooms"
      :floor="store.selectedFloor"
      @add="store.addRoom"
      @edit="store.updateRoom"
    />
  </v-container>
</template>
