import { defineStore } from 'pinia'
import type { AbstractCard } from '~~/types/cards'

export const useCardsStore = defineStore('cards', {
  state: () => ({
    cards: [] as AbstractCard[]
  })
})
