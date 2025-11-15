
import { Card, CardType, CardState } from './types';

export const POINTS = {
  NEUTRAL_CARD: 20,
  UNIQUE_CARD: 80,
  MONSTER_CARD: 80,
  FORBIDDEN_CARD: 20,
  EPIPHANY_BONUS: 10,
  DIVINE_EPIPHANY_BONUS: 20,
  CONVERSION_COST: 10,
  BASIC_REMOVAL_BONUS: 20,
};

export const REMOVAL_COST_LADDER = [0, 10, 30, 50, 70];
export const DUPLICATION_COST_LADDER = [0, 10, 30, 50, 70];

export const INITIAL_CARDS: Card[] = [
  { id: 1, type: CardType.BASIC, originalType: CardType.BASIC, state: CardState.NONE },
  { id: 2, type: CardType.BASIC, originalType: CardType.BASIC, state: CardState.NONE },
  { id: 3, type: CardType.BASIC, originalType: CardType.BASIC, state: CardState.NONE },
  { id: 4, type: CardType.UNIQUE, originalType: CardType.UNIQUE, state: CardState.NONE },
  { id: 5, type: CardType.UNIQUE, originalType: CardType.UNIQUE, state: CardState.NONE },
  { id: 6, type: CardType.UNIQUE, originalType: CardType.UNIQUE, state: CardState.NONE },
  { id: 7, type: CardType.UNIQUE, originalType: CardType.UNIQUE, state: CardState.NONE },
  { id: 8, type: CardType.UNIQUE, originalType: CardType.UNIQUE, state: CardState.NONE, isUltimate: true },
];