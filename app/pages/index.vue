<script setup lang="ts">
import { useDecksStore } from '~/stores/decks'

import { storeToRefs } from 'pinia'

const decksStore = useDecksStore()
const { decks } = storeToRefs(decksStore)
</script>
<template>
  <div>

    <UEmpty
        icon="i-lucide-file"
        title="No decks found"
        description="Upload data files to create new decks"
        :actions="[
            {
              label: 'Upload new Deck',
              color: 'neutral',
            }
        ]"
    >
      <template #footer>
        <CsvImportCard></CsvImportCard>

        <USeparator class="my-4" />

        <div class="grid grid-cols-1 gap-4">
          <UPageCard
              v-for="(deck, index) in decks"
              :key="index"
              :to="`/decks/${deck.id}/table`"
              :ui="{ container: 'sm:p-4' }"
          >
            <UUser
                :avatar="deck.avatar"
                :name="deck.name"
                :description="deck.cards.length"
                :ui="{ name: 'truncate' }"
            />
          </UPageCard>
        </div>
      </template>
    </UEmpty>



  </div>
</template>
