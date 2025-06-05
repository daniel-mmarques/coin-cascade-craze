
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface RouletteProps {
  onWin: (amount: number) => void;
  onSpin: () => boolean;
}

const Roulette = ({ onWin, onSpin }: RouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedBet, setSelectedBet] = useState<'red' | 'black' | 'green' | null>(null);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const { toast } = useToast();

  const numbers = Array.from({ length: 37 }, (_, i) => i); // 0-36
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

  const getNumberColor = (num: number) => {
    if (num === 0) return 'green';
    return redNumbers.includes(num) ? 'red' : 'black';
  };

  const spin = async () => {
    if (!selectedBet) {
      toast({
        title: "Selecione uma aposta!",
        description: "Escolha vermelho, preto ou verde antes de girar.",
        variant: "destructive",
      });
      return;
    }

    if (!onSpin()) {
      toast({
        title: "Moedas insuficientes!",
        description: "Você precisa de pelo menos 10 moedas para jogar.",
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    
    const winningNumber = Math.floor(Math.random() * 37);
    const winningColor = getNumberColor(winningNumber);
    
    // Animate the wheel
    const spins = 5 + Math.random() * 5;
    const finalRotation = rotation + (spins * 360) + (winningNumber * (360 / 37));
    setRotation(finalRotation);
    
    setTimeout(() => {
      setLastResult(winningNumber);
      setIsSpinning(false);
      
      let winAmount = 0;
      let message = '';
      
      if (selectedBet === winningColor) {
        if (winningColor === 'green') {
          winAmount = 350; // 35x payout for green
          message = '🎉 VERDE! Pagamento 35x!';
        } else {
          winAmount = 20; // 2x payout for red/black
          message = `🎉 ${winningColor.toUpperCase()}! Você ganhou!`;
        }
        
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
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-b from-red-800 to-red-900 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border-2 md:border-4 border-yellow-400/50 max-w-sm md:max-w-none mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 text-center mb-6">🎰 ROLETA 🎰</h2>
      
      {/* Wheel */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32 md:w-48 md:h-48">
          <div 
            className="w-full h-full rounded-full border-4 border-yellow-400 relative overflow-hidden transition-transform duration-3000 ease-out"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(
                red 0deg 20deg,
                black 20deg 40deg,
                red 40deg 60deg,
                black 60deg 80deg,
                red 80deg 100deg,
                black 100deg 120deg,
                red 120deg 140deg,
                black 140deg 160deg,
                red 160deg 180deg,
                black 180deg 200deg,
                red 200deg 220deg,
                black 220deg 240deg,
                red 240deg 260deg,
                black 260deg 280deg,
                red 280deg 300deg,
                black 300deg 320deg,
                red 320deg 340deg,
                green 340deg 360deg
              )`
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-white rounded-full border-2 border-gray-800"></div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400"></div>
        </div>
      </div>

      {/* Last Result */}
      {lastResult !== null && (
        <div className="text-center mb-4">
          <div className={`inline-block px-4 py-2 rounded-full text-white font-bold text-lg ${
            getNumberColor(lastResult) === 'red' ? 'bg-red-500' :
            getNumberColor(lastResult) === 'black' ? 'bg-black' : 'bg-green-500'
          }`}>
            {lastResult}
          </div>
        </div>
      )}

      {/* Betting Options */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <Button
          onClick={() => setSelectedBet('red')}
          disabled={isSpinning}
          className={`py-4 rounded-xl font-bold text-white ${
            selectedBet === 'red' 
              ? 'bg-red-600 ring-4 ring-yellow-400' 
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          🔴 VERMELHO
        </Button>
        <Button
          onClick={() => setSelectedBet('black')}
          disabled={isSpinning}
          className={`py-4 rounded-xl font-bold text-white ${
            selectedBet === 'black' 
              ? 'bg-gray-900 ring-4 ring-yellow-400' 
              : 'bg-black hover:bg-gray-800'
          }`}
        >
          ⚫ PRETO
        </Button>
        <Button
          onClick={() => setSelectedBet('green')}
          disabled={isSpinning}
          className={`py-4 rounded-xl font-bold text-white ${
            selectedBet === 'green' 
              ? 'bg-green-600 ring-4 ring-yellow-400' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          🟢 VERDE
        </Button>
      </div>

      {/* Spin Button */}
      <Button
        onClick={spin}
        disabled={isSpinning || !selectedBet}
        className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold text-base md:text-xl py-3 md:py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100"
      >
        {isSpinning ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
            GIRANDO...
          </div>
        ) : (
          "🎲 GIRAR (10 moedas)"
        )}
      </Button>

      {/* Payout Info */}
      <div className="text-center mt-4 text-xs md:text-sm text-white/60">
        Vermelho/Preto: 2x | Verde: 35x
      </div>
    </div>
  );
};

export default Roulette;
