
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SlotReel from './SlotReel';
import { useToast } from '@/hooks/use-toast';

interface SlotMachineProps {
  onWin: (amount: number) => void;
  onSpin: () => boolean;
}

const symbols = ['🍒', '🍋', '🔔', '💎', '⭐', '7️⃣'];

const SlotMachine = ({ onWin, onSpin }: SlotMachineProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [results, setResults] = useState(['🍒', '🍋', '🔔']);
  const { toast } = useToast();

  const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

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
        title: "Not enough coins!",
        description: "You need at least 10 coins to spin.",
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    
    // Generate new results
    const newResults = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    setResults(newResults);
    
    // Wait for animation to finish
    setTimeout(() => {
      setIsSpinning(false);
      
      const winAmount = calculateWin(newResults);
      if (winAmount > 0) {
        onWin(winAmount);
        
        let title = "You Win!";
        if (winAmount >= 1000) title = "🎉 JACKPOT! 🎉";
        else if (winAmount >= 100) title = "🎊 Big Win! 🎊";
        
        toast({
          title,
          description: `You won ${winAmount} coins!`,
          className: "bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-none",
        });
      } else {
        toast({
          title: "Try again!",
          description: "Better luck next time!",
        });
      }
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-yellow-400/50">
      {/* Slot Machine Display */}
      <div className="bg-black rounded-2xl p-6 mb-6 border-2 border-yellow-400/30">
        <div className="flex gap-4 justify-center items-center">
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
          className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100"
        >
          {isSpinning ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              SPINNING...
            </div>
          ) : (
            "🎰 SPIN 🎰"
          )}
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="flex justify-between mt-4 text-yellow-400">
        <div className="text-2xl animate-pulse">✨</div>
        <div className="text-2xl animate-pulse delay-300">💫</div>
        <div className="text-2xl animate-pulse delay-500">⭐</div>
      </div>
    </div>
  );
};

export default SlotMachine;
