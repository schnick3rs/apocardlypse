<script setup lang="ts">
import { useDecksStore } from '~/stores/decks'

import { storeToRefs } from 'pinia'

const decksStore = useDecksStore()
const { decks } = storeToRefs(decksStore)
import type {AbstractCard, Deck} from '~~/types/cards';
import {nanoid} from "nanoid";

const cards = ref([])
const file = ref<File[]>([])

function mapToAbstractCard(row: any): AbstractCard {
  return {
    id: row['#'],
    layout: row.Layout ?? '',
    name: row.Cardname ?? '',
    cost: Number(row.Cost ?? 0),
    text: row.Text ?? '',

    stats: {
      ang: row.ANG ?? null,
      ver: row.VER ?? null,
      int: row.INT ?? null,
      fok: row.FOK ?? null,
      aus: row.AUS ?? null,
      erh: row.ERH ?? null,
    },

    planning: row.Plan ?? '',

    tags: row.Tags ? row.Tags.split(/[,;]+/).map(t => t.trim()) : [],

    sourceName: row.SourceName ?? '',
    sourceLevel: Number(row.SourceLevel ?? 0),
    sourceType: row.SourceType ?? '',

    imageUrl: row.ImageLink ?? ''
  };
}

const parseCsv = () => {
  console.info('parseCsv', file.value)
  if (file.value) {
    const reader = new FileReader()

    const csvToArray = (str: string, delimiter: string = '\t') => {
      console.log('[CSV] Processing text', str.length, delimiter)

      // slice from start of text to the first \n index
      // use split to create an array from string by delimiter
      const headers = str.slice(0, str.indexOf('\r\n')).split(delimiter)
      console.log('[CSV] Headers found', headers)

      // slice from \n index + 1 to the end of the text
      // use split to create an array of each csv value row
      const rows = str.slice(str.indexOf('\r\n') + 1).split('\r\n')
      console.log('[CSV] Rows found', rows.length)

      // Map the rows
      // split values from each row into an array
      // use headers.reduce to create an object
      // object properties derived from headers:values
      // the object passed as an element of the array
      const arr = rows.map(function (row) {
        const values = row.split(delimiter)
        const el = headers.reduce(function (object, header, index) {
          object[header] = values[index]
          return object
        }, {})
        return el
      })

      // return the array
      return arr
    }

    reader.onload = (e) => {
      console.info('file loaded', e)
      const text: string | ArrayBuffer | null | undefined = e.target?.result
      if (text && typeof text === 'string') {
        const data = csvToArray(text)
        const cleaned = data
          .filter(item => item.Cardname !== '')
          .map((item) => {
            return mapToAbstractCard(item)
          })
        cards.value = cleaned
        let date = new Date();
        const deck: Deck = {
          id: nanoid(),
          name: file.value.name,
          sourceFileName: file.value.name,
          cards: cleaned,
          createdAt: date.toString(),
        };
        decks.value.push(deck);
      }
    }

    reader.readAsText(file.value)
  }
}
</script>

<template>
  <section>
    <UFileUpload
      v-model="file"
      label="Drop your cards csv here"
      description="Yo big K., drop that CSV"
      class="w-96 min-h-48"
      @change="parseCsv"
    />
  </section>
</template>

<style scoped>

</style>
