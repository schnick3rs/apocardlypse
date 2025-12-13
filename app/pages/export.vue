<script setup lang="ts">
import { useCardsStore } from '~/stores/cards'

import { storeToRefs } from 'pinia'

const cardsStore = useCardsStore()
const { cards } = storeToRefs(cardsStore)
</script>

<template>
  <section id="print-area" class="m-2">
    <div v-for="(card) in cards">
        <GenericCard :key="card.id" :card="card"></GenericCard>
      </div>
  </section>
</template>

<style scoped>

</style>
