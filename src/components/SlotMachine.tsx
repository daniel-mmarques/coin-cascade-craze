
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SlotReel from './SlotReel';
import { useToast } from '@/hooks/use-toast';

interface SlotMachineProps {
  onWin: (amount: number) => void;
  onSpin: () => boolean;
}

const symbols = ['🍒', '🍋', '🔔', '💎', '⭐', '7️⃣'];

// 🎯 CONFIGURAÇÃO DE CHANCE DE VITÓRIA
// Altere este valor para controlar a probabilidade de vitória:
// 0.1 = 10% de chance, 0.2 = 20% de chance, 0.5 = 50% de chance, etc.
const WIN_CHANCE = 0; // 15% de chance de vitória

const SlotMachine = ({ onWin, onSpin }: SlotMachineProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState(['🍒', '🍋', '🔔']);
  const [showWinAnimation, setShowWinAnimation] = useState(false);
  const { toast } = useToast();

  const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

  const generateResults = () => {
    const shouldWin = Math.random() < WIN_CHANCE;
    
    if (shouldWin) {
      // Forçar uma vitória - escolher um símbolo e repetir 3 vezes
      const winningSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      return [winningSymbol, winningSymbol, winningSymbol];
    } else {
      // Garantir que não há vitória - gerar símbolos diferentes
      let newResults;
      do {
        newResults = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
      } while (calculateWin(newResults) > 0);
      return newResults;
    }
  };

  const calculateWin = (reels: string[]) => {
    const [first, second, third] = reels;
    
    // Check for three of a kind
    if (first === second && second === third) {
      switch (first) {
        case '💎': return 1000; // Jackpot
        case '7️⃣': return 500;
        case '⭐': return 200;
        case '🍒': return 100;
        case '🔔': return 50;
        case '🍋': return 30;
        default: return 20;
      }
    }
    
    // Check for two of a kind
    if (first === second || second === third || first === third) {
      return 10;
    }
    
    return 0;
  };

  const handleSpin = async () => {
    if (isSpinning) return;
    
    if (!onSpin()) {
      toast({
        title: "Moedas insuficientes!",
        description: "Você precisa de pelo menos 10 moedas para girar.",
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    setShowWinAnimation(false);
    
    // Generate new results with controlled win chance
    const newResults = generateResults();
    setResults(newResults);
    
    // Wait for animation to finish
    setTimeout(() => {
      setIsSpinning(false);
      
      const winAmount = calculateWin(newResults);
      if (winAmount > 0) {
        setShowWinAnimation(true);
        setTimeout(() => setShowWinAnimation(false), 4000);
        
        onWin(winAmount);
        
        let title = "Você Ganhou!";
        if (winAmount >= 1000) title = "🎉 JACKPOT! 🎉";
        else if (winAmount >= 100) title = "🎊 Grande Vitória! 🎊";
        
        toast({
          title,
          description: `Você ganhou ${winAmount} moedas!`,
          className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-none",
        });
      } else {
        toast({
          title: "Tente novamente!",
          description: "Mais sorte na próxima vez!",
        });
      }
    }, 3000);
  };

  return (
    <div className={`bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border-2 md:border-4 border-yellow-400/50 transition-all duration-300 max-w-sm md:max-w-none mx-auto ${showWinAnimation ? 'animate-pulse scale-105' : ''}`}>
      {/* Slot Machine Display */}
      <div className="bg-black rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border-2 border-yellow-400/30 relative overflow-hidden">
        {/* Background animation when winning */}
        {showWinAnimation && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 animate-pulse"></div>
        )}
        
        <div className="flex gap-2 md:gap-4 justify-center items-center relative z-10">
          {results.map((symbol, index) => (
            <SlotReel 
              key={index} 
              symbol={symbol} 
              isSpinning={isSpinning}
              delay={index * 200}
            />
          ))}
        </div>
      </div>

      {/* Spin Button */}
      <div className="text-center">
        <Button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold text-base md:text-xl px-8 md:px-12 py-3 md:py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100 w-full md:w-auto ${showWinAnimation ? 'animate-bounce' : ''}`}
        >
          {isSpinning ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
              GIRANDO...
            </div>
          ) : (
            "🎰 GIRAR 🎰"
          )}
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="flex justify-between mt-3 md:mt-4 text-yellow-400 px-2">
        <div className="text-xl md:text-2xl animate-pulse">✨</div>
        <div className="text-xl md:text-2xl animate-pulse delay-300">💫</div>
        <div className="text-xl md:text-2xl animate-pulse delay-500">⭐</div>
      </div>
      
      {/* Win Chance Display */}
      <div className="text-center mt-3 md:mt-4 text-xs md:text-sm text-white/60">
        Taxa de vitória: {(WIN_CHANCE * 100).toFixed(1)}%
      </div>
    </div>
  );
};

export default SlotMachine;
