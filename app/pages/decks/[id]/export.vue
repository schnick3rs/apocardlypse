<script setup lang="ts">
import { useDecksStore } from '~/stores/decks'
import type {AbstractCard, Deck} from '~~/types/cards'

import domtoimage from 'dom-to-image'
import { saveAs } from 'file-saver'
import {AdversaryPlanCard, GenericCard} from "#components";

const decksStore = useDecksStore()
const route = useRoute()

const deckId: string = route.params.id as string
const deck: Deck | undefined = decksStore.byId(deckId)

if (!deck) {
  throw new Error('Deck not found!')
}

const loading = ref(false)

const downloadPng = async (id: string) => {
  const some = document.getElementById('print-area').getBoundingClientRect()
  console.log(some)

  loading.value = true
  console.info(`Downloading ${id}`)
  try {
    const node = document.getElementById(id)
    if (!node) return

    const blob = await domtoimage.toBlob(node, {
      bgcolor: 'white',
      cacheBust: true,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
      }
    })
    saveAs(blob, `apocardlypse-deck-for-tts.png`)
  } catch (error) {
    console.error('oops, something went wrong!', error)
  } finally {
    loading.value = false
  }
}

//
const scale = ref(1)

const dynamicCard = (card: AbstractCard) => {
  switch (card.layout) {
    case 'Nebenplan':
      return AdversaryPlanCard
    case 'Plan':
      return card.sourceType === 'Adversary' ? AdversaryPlanCard : GenericCard
    default:
      return GenericCard
  }
}
</script>

<template>
  <UPageCard>
    <USlider
      v-model="scale"
      :min="1"
      :max="4"
    />
    <UProgress v-show="loading" />
    <UButton @click="downloadPng('print-area')">
      Download TTS ready PNG
    </UButton>
  </UPageCard>

  <section class="m-2">
    <div
      id="print-area"
      class="
        flex
        flex-wrap
        gap-0
        items-start
        w-fit
        bg-white
      "
    >
      <div v-for="(card) in deck.cards">
        <component
            :key="card.id"
            :is="dynamicCard(card)"
            :card="card"
            :scale="scale"
        ></component>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
