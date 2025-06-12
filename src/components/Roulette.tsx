
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { shouldPlayerWin } from '@/config/gameConfig';
import RouletteWheel from './roulette/RouletteWheel';
import BettingSection from './roulette/BettingSection';
import LastResult from './roulette/LastResult';
import { RouletteProps, BetType, RouletteNumber } from './roulette/types';
import { 
  ROULETTE_NUMBERS, 
  getNumberColor, 
  generateWinningNumber, 
  calculatePayout 
} from './roulette/RouletteLogic';

const Roulette = ({ onWin, onSpin }: RouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedBet, setSelectedBet] = useState<BetType>(null);
  const [lastResult, setLastResult] = useState<RouletteNumber | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [ballRotation, setBallRotation] = useState(0);
  const [betAmount, setBetAmount] = useState(5);
  const { toast } = useToast();

  const spin = async () => {
    if (!selectedBet) {
      toast({
        title: "Selecione uma aposta!",
        description: "Escolha vermelho, preto ou verde antes de girar.",
        variant: "destructive",
      });
      return;
    }

    if (!onSpin(betAmount)) {
      toast({
        title: "Moedas insuficientes!",
        description: `Você precisa de pelo menos ${betAmount} moedas para apostar.`,
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    
    const willWin = shouldPlayerWin();
    const winningNumber = generateWinningNumber(selectedBet, willWin);
    const winningColor = getNumberColor(winningNumber);
    
    // Animate the wheel and ball
    const wheelSpins = 3 + Math.random() * 3;
    const ballSpins = 5 + Math.random() * 4;
    const finalWheelRotation = wheelRotation + (wheelSpins * 360);
    const finalBallRotation = ballRotation - (ballSpins * 360) - (winningNumber * (360 / 37));
    
    setWheelRotation(finalWheelRotation);
    setBallRotation(finalBallRotation);
    
    setTimeout(() => {
      setLastResult(winningNumber);
      setIsSpinning(false);
      
      const { multiplier, message } = calculatePayout(selectedBet, winningColor, betAmount);
      
      if (multiplier > 0) {
        const winAmount = multiplier * betAmount;
        onWin(winAmount);
        toast({
          title: message,
          description: `Número ${winningNumber} - Você ganhou ${winAmount} moedas!`,
          className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-none",
        });
      } else {
        toast({
          title: "Tente novamente!",
          description: `Número ${winningNumber} - ${winningColor.toUpperCase()}`,
        });
      }
    }, 4000);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border-2 md:border-4 border-red-600/50 max-w-sm md:max-w-none mx-auto relative overflow-hidden">
      {/* Casino lights effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 animate-pulse"></div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-red-400 text-center mb-6 relative z-10">
        ♠️ ROULETTE EUROPÉIA ♠️
      </h2>
      
      {/* Roulette Wheel */}
      <div className="flex justify-center mb-6 relative z-10">
        <RouletteWheel
          numbers={ROULETTE_NUMBERS}
          wheelRotation={wheelRotation}
          ballRotation={ballRotation}
          getNumberColor={getNumberColor}
        />
      </div>

      {/* Last Result */}
      <div className="relative z-10">
        <LastResult lastResult={lastResult} getNumberColor={getNumberColor} />
      </div>

      {/* Betting Section */}
      <div className="relative z-10">
        <BettingSection
          selectedBet={selectedBet}
          setSelectedBet={setSelectedBet}
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          isSpinning={isSpinning}
          onSpin={spin}
        />
      </div>

      {/* Casino atmosphere */}
      <div className="absolute bottom-2 left-2 text-red-500/30 text-2xl animate-pulse">♠️</div>
      <div className="absolute top-2 right-2 text-red-500/30 text-2xl animate-pulse" style={{ animationDelay: '1s' }}>♦️</div>
      <div className="absolute bottom-2 right-2 text-red-500/30 text-2xl animate-pulse" style={{ animationDelay: '2s' }}>♣️</div>
    </div>
  );
};

export default Roulette;
