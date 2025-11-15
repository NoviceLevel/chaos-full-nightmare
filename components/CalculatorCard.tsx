import React from 'react';
import { Card, CardState, CardType } from '../types';
import { ArrowPathIcon, MinusCircleIcon, SparklesIcon, Square2StackIcon, StarIcon } from './Icons';

interface CalculatorCardProps {
  card: Card;
  isLast: boolean;
  onUpdate: (card: Card) => void;
  onRemove: (cardId: number) => void;
  onDuplicate: (card: Card) => void;
  onConvert: (cardId: number) => void;
  buttonTextSize: number;
}

const cardStyles = {
  base: 'aspect-[2/3] w-full max-w-[280px] mx-auto rounded-lg shadow-lg p-3 flex flex-col justify-between transition-all duration-300 border-2 overflow-hidden',
  [CardType.BASIC]: 'bg-gray-200 border-gray-300 text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white',
  [CardType.UNIQUE]: 'bg-blue-200 border-blue-400 text-blue-900 dark:bg-blue-900/50 dark:border-blue-700 dark:text-white',
  [CardType.NEUTRAL]: 'bg-stone-300 border-stone-400 text-stone-900 dark:bg-stone-600 dark:border-stone-500 dark:text-white',
  [CardType.MONSTER]: 'bg-gradient-to-br from-purple-400 to-blue-400 border-purple-500 text-white dark:from-purple-800 dark:to-blue-800 dark:border-purple-600',
  [CardType.FORBIDDEN]: 'bg-red-200 border-red-400 text-red-900 dark:bg-red-900/50 dark:border-red-700 dark:text-white',
  ULTIMATE: 'bg-purple-200 border-purple-400 text-purple-900 dark:bg-purple-900/50 dark:border-purple-700 dark:text-white',
};

const stateStyles = {
  [CardState.NONE]: 'border-opacity-50',
  [CardState.EPIPHANY]: 'border-yellow-500 dark:border-yellow-400 shadow-yellow-500/40 dark:shadow-yellow-400/30 shadow-[0_0_15px]',
  [CardState.DIVINE_EPIPHANY]: 'border-cyan-500 dark:border-cyan-400 shadow-cyan-500/40 dark:shadow-cyan-400/30 shadow-[0_0_15px]',
};

const buttonStyles = {
  base: 'w-full font-semibold py-1.5 px-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900',
  enabled: 'hover:bg-opacity-80',
  disabled: 'opacity-50 cursor-not-allowed',
};

const ActionButton: React.FC<{
  onClick: () => void;
  label: string;
  color: string;
  icon: React.ReactNode;
  textSize: number;
  disabled?: boolean;
}> = ({ onClick, label, color, disabled = false, icon, textSize }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{ fontSize: `${textSize}px` }}
    className={`${buttonStyles.base} ${color} ${
      disabled ? buttonStyles.disabled : buttonStyles.enabled
    } flex items-center justify-center gap-1.5`}
  >
    {icon}
    <span className="truncate">{label}</span>
  </button>
);


const CalculatorCard: React.FC<CalculatorCardProps> = ({ card, isLast, onUpdate, onRemove, onDuplicate, onConvert, buttonTextSize }) => {
  const isEpiphanyDisabled = card.type === CardType.BASIC || isLast;

  const handleStateChange = (newState: CardState) => {
    const currentState = card.state;
    onUpdate({
      ...card,
      state: currentState === newState ? CardState.NONE : newState,
    });
  };
  
  const handleConvert = () => {
    onConvert(card.id);
  };

  const cardTitle = isLast ? 'Ultimate' : card.type;

  return (
    <div className={`${cardStyles.base} ${isLast ? cardStyles.ULTIMATE : cardStyles[card.type]} ${stateStyles[card.state]}`}>
      <div className="text-center min-h-[3rem]">
        <p className="font-bold text-sm sm:text-base capitalize">{cardTitle}</p>
        <p className={`text-xs capitalize ${card.state === CardState.NONE ? 'opacity-50' : ''}`}>
          {card.state.replace('_', ' ')}
        </p>
      </div>
      <div className="grid grid-rows-5 gap-1.5">
        {!isEpiphanyDisabled ? (
          <ActionButton 
            label="Epiphany"
            color="bg-yellow-500 text-black"
            onClick={() => handleStateChange(CardState.EPIPHANY)}
            icon={<StarIcon className="w-4 h-4 flex-shrink-0" />}
            textSize={buttonTextSize}
          />
        ) : <div />}
        {!isEpiphanyDisabled ? (
          <ActionButton 
            label="Divine Epiphany"
            color="bg-cyan-500 text-black"
            onClick={() => handleStateChange(CardState.DIVINE_EPIPHANY)}
            icon={<SparklesIcon className="w-4 h-4 flex-shrink-0" />}
            textSize={buttonTextSize}
          />
        ) : <div />}
        <ActionButton 
          label="Convert"
          color="bg-gray-300 text-black"
          onClick={handleConvert}
          disabled={card.type === CardType.NEUTRAL}
          icon={<ArrowPathIcon className="w-4 h-4 flex-shrink-0" />}
          textSize={buttonTextSize}
        />
        <ActionButton 
          label="Duplicate"
          color="bg-purple-600 text-white"
          onClick={() => onDuplicate(card)}
          icon={<Square2StackIcon className="w-4 h-4 flex-shrink-0" />}
          textSize={buttonTextSize}
        />
        <ActionButton 
          label="Remove"
          color="bg-red-600 text-white"
          onClick={() => onRemove(card.id)}
          icon={<MinusCircleIcon className="w-4 h-4 flex-shrink-0" />}
          textSize={buttonTextSize}
        />
      </div>
    </div>
  );
};

export default CalculatorCard;