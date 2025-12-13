<script setup lang="ts">
import { useDecksStore } from '~/stores/decks'
import type {Deck} from '~~/types/cards';
const decksStore = useDecksStore()
const route = useRoute()

const deckId: string = route.params.id as string;
const deck: Deck | undefined = decksStore.byId(deckId);

if (!deck) {
  throw new Error('Deck not found!')
}
</script>

<template>

  <UPageCard :title="deck.name" :description="`Loaded on ${deck.createdAt}`">
    <UButton color="success" variant="subtle" :to="`/decks/${deck.id}/export`">TTS Export</UButton>
  </UPageCard>

  <div v-if="deck">
    <UTable :data="deck.cards" />
  </div>
</template>

<style scoped>

</style>