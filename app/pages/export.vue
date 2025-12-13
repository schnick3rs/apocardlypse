<script setup lang="ts">
import { useCardsStore } from '~/stores/cards'

import { storeToRefs } from 'pinia'
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver'

const cardsStore = useCardsStore()
const { cards } = storeToRefs(cardsStore)

const loading = ref(false);

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
        transformOrigin: 'top left',
      },
    });
    saveAs(blob, `apocardlypse-deck-for-tts.png`)
  } catch (error) {
    console.error('oops, something went wrong!', error)
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <UPageCard>
    <UProgress v-show="loading"></UProgress>
    <UButton @click="downloadPng('print-area')">Download TTS ready PNG</UButton>
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
      <div v-for="(card) in cards">
        <GenericCard :key="card.id" :card="card"></GenericCard>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
