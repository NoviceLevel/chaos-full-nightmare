
import { Card, CardType, CardState } from './types';
import { INITIAL_CARDS } from './constants';

// State related to the core game logic that can be undone
export interface GameState {
  cards: Card[];
  removedCards: Card[];
  duplicationCount: number;
  conversionCount: number;
  nextId: number;
}

// Function to generate a fresh, deep-copied initial GAME state
export const getInitialGameState = (): GameState => ({
  cards: JSON.parse(JSON.stringify(INITIAL_CARDS)), // Full deep copy
  removedCards: [],
  duplicationCount: 0,
  conversionCount: 0,
  nextId: INITIAL_CARDS.length + 1,
});

export function getLadderCost(ladder: number[], count: number): number {
  const index = Math.min(count, ladder.length - 1);
  return ladder[index];
}
