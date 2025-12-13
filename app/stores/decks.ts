import { defineStore } from 'pinia'
import type { Deck } from '~~/types/cards'

export const useDecksStore = defineStore('decks', {
  state: () => ({
    decks: [] as Deck[]
  }),

    getters: {
      byId(state) {
          return (id: string): Deck | undefined => state.decks.find(deck => deck.id === id);
      }
    }
})
