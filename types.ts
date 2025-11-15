
export enum CardType {
  BASIC = 'basic',
  UNIQUE = 'unique',
  NEUTRAL = 'neutral',
  MONSTER = 'monster',
  FORBIDDEN = 'forbidden',
}

export enum CardState {
  NONE = 'none',
  EPIPHANY = 'epiphany',
  DIVINE_EPIPHANY = 'divine_epiphany',
}

export interface Card {
  id: number;
  type: CardType;
  originalType: CardType;
  state: CardState;
  isUltimate?: boolean;
}