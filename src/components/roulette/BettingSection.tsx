
import { Button } from '@/components/ui/button';
import { BetType } from './types';

interface BettingSectionProps {
  selectedBet: BetType;
  setSelectedBet: (bet: BetType) => void;
  betAmount: number;
  setBetAmount: (amount: number) => void;
  isSpinning: boolean;
  onSpin: () => void;
}

const BettingSection = ({ 
  selectedBet, 
  setSelectedBet, 
  betAmount, 
  setBetAmount, 
  isSpinning, 
  onSpin 
}: BettingSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Bet Amount Selector */}
      <div className="text-center">
        <div className="text-white/70 text-sm mb-2">VALOR DA APOSTA:</div>
        <div className="flex justify-center items-center gap-2">
          <Button
            onClick={() => setBetAmount(Math.max(5, betAmount - 5))}
            disabled={isSpinning || betAmount <= 5}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm"
          >
            -5
          </Button>
          <div className="bg-black/50 px-4 py-2 rounded-lg border border-yellow-400/30">
            <span className="text-yellow-400 font-bold text-lg">{betAmount} 🪙</span>
          </div>
          <Button
            onClick={() => setBetAmount(betAmount + 5)}
            disabled={isSpinning}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
          >
            +5
          </Button>
        </div>
      </div>

      {/* Betting Options */}
      <div className="grid grid-cols-3 gap-3">
        <Button
          onClick={() => setSelectedBet('red')}
          disabled={isSpinning}
          className={`py-4 md:py-6 rounded-xl font-bold text-white text-sm md:text-base transition-all duration-200 ${
            selectedBet === 'red' 
              ? 'bg-gradient-to-br from-red-500 to-red-700 ring-4 ring-red-400 scale-105 shadow-lg' 
              : 'bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 shadow-md hover:scale-102'
          }`}
        >
          🔴 VERMELHO<br/>
          <span className="text-xs opacity-80">Paga 2x</span>
        </Button>
        <Button
          onClick={() => setSelectedBet('black')}
          disabled={isSpinning}
          className={`py-4 md:py-6 rounded-xl font-bold text-white text-sm md:text-base transition-all duration-200 ${
            selectedBet === 'black' 
              ? 'bg-gradient-to-br from-gray-700 to-black ring-4 ring-gray-500 scale-105 shadow-lg' 
              : 'bg-gradient-to-br from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 shadow-md hover:scale-102'
          }`}
        >
          ⚫ PRETO<br/>
          <span className="text-xs opacity-80">Paga 2x</span>
        </Button>
        <Button
          onClick={() => setSelectedBet('green')}
          disabled={isSpinning}
          className={`py-4 md:py-6 rounded-xl font-bold text-white text-sm md:text-base transition-all duration-200 ${
            selectedBet === 'green' 
              ? 'bg-gradient-to-br from-green-500 to-green-700 ring-4 ring-green-400 scale-105 shadow-lg' 
              : 'bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 shadow-md hover:scale-102'
          }`}
        >
          🟢 VERDE<br/>
          <span className="text-xs opacity-80">Paga 35x</span>
        </Button>
      </div>

      {/* Spin Button */}
      <div className="text-center">
        <Button
          onClick={onSpin}
          disabled={isSpinning || !selectedBet}
          className="w-3/6 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-bold text-base md:text-xl py-3 md:py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100 border-2 border-red-400"
        >
          {isSpinning ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
              GIRANDO A ROLETA...
            </div>
          ) : (
            `🎲 GIRAR ROLETA`
          )}
        </Button>
      </div>
    </div>
  );
};

export default BettingSection;
