
export type RouletteNumber = number;
export type BetType = 'red' | 'black' | 'green' | null;
export type NumberColor = 'red' | 'black' | 'green';

export interface RouletteProps {
  onWin: (amount: number) => void;
  onSpin: (amount: number) => boolean;
}
