import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { ListItem } from "../../api/getListData";

interface CardState {
  cards: ListItem[];
  initializeCards: (cards: ListItem[]) => void;
  toggleCardExpansion: (cardId: number) => void;
  toggleCardDeletion: (cardId: number) => void;
  deleteCard: (cardId: number) => void;
  restoreCard: (cardId: number) => void;
}

export const useCardStore = create<CardState>()(
  persist(
    immer((set) => ({
      cards: [],

      initializeCards: (cards) => set((state) => {
        const existingCardStates = new Map(
          state.cards.map(card => [card.id, { deleted: card.deleted, expanded: card.expanded }])
        );

        state.cards = cards.map(card => ({
          ...card,
          deleted: existingCardStates.get(card.id)?.deleted || false,
          expanded: existingCardStates.get(card.id)?.expanded || false
        }));
      }),

      toggleCardExpansion: (cardId) => set((state) => {
        const card = state.cards.find(c => c.id === cardId);
        if (card) {
          card.expanded = !card.expanded;
        }
      }),

      toggleCardDeletion: (cardId) => set((state) => {
        const card = state.cards.find(c => c.id === cardId);
        if (card) {
          card.deleted = !card.deleted;
        }
      }),

      deleteCard: (cardId) => set((state) => {
        const card = state.cards.find(c => c.id === cardId);
        if (card) {
          card.deleted = true;
        }
      }),

      restoreCard: (cardId) => set((state) => {
        const card = state.cards.find(c => c.id === cardId);
        if (card) {
          card.deleted = false;
        }
      })
    })),
    {
      name: 'card-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cards: state.cards })
    }
  )
);
