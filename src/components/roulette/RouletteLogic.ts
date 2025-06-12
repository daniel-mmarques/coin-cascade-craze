
import { BetType, RouletteNumber, NumberColor } from './types';

export const ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

export const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
export const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

export const getNumberColor = (num: RouletteNumber): NumberColor => {
  if (num === 0) return 'green';
  return RED_NUMBERS.includes(num) ? 'red' : 'black';
};

export const generateWinningNumber = (selectedBet: BetType, willWin: boolean): RouletteNumber => {
  if (willWin) {
    if (selectedBet === 'green') {
      return 0;
    } else if (selectedBet === 'red') {
      return RED_NUMBERS[Math.floor(Math.random() * RED_NUMBERS.length)];
    } else { // black
      return BLACK_NUMBERS[Math.floor(Math.random() * BLACK_NUMBERS.length)];
    }
  } else {
    // Generate losing number
    let winningNumber;
    do {
      winningNumber = Math.floor(Math.random() * 37);
    } while (getNumberColor(winningNumber) === selectedBet);
    return winningNumber;
  }
};

export const calculatePayout = (selectedBet: BetType, winningColor: NumberColor, betAmount: number) => {
  if (selectedBet !== winningColor) return { multiplier: 0, message: '' };

  if (winningColor === 'green') {
    return {
      multiplier: 35,
      message: '🎉 VERDE! Pagamento 35x!'
    };
  } else {
    return {
      multiplier: 2,
      message: `🎉 ${winningColor.toUpperCase()}! Você ganhou!`
    };
  }
};
