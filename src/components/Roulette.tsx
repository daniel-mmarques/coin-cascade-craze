
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
  const [wheelRotation, setWheelRotation] = useState(0);
  const [ballRotation, setBallRotation] = useState(0);
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
    }, 4000);
  };

  const rouletteNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border-2 md:border-4 border-red-600/50 max-w-sm md:max-w-none mx-auto relative overflow-hidden">
      {/* Casino lights effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 animate-pulse"></div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-red-400 text-center mb-6 relative z-10">
        ♠️ ROULETTE EUROPÉIA ♠️
      </h2>
      
      {/* Roulette Wheel */}
      <div className="flex justify-center mb-6 relative z-10">
        <div className="relative w-48 h-48 md:w-72 md:h-72">
          {/* Outer rim */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 shadow-2xl"></div>
          
          {/* Wheel with numbers */}
          <div 
            className="absolute inset-2 rounded-full relative overflow-hidden transition-transform duration-4000 ease-out shadow-inner bg-gradient-to-br from-amber-900 to-amber-800"
            style={{ 
              transform: `rotate(${wheelRotation}deg)`,
            }}
          >
            {/* Number segments */}
            {rouletteNumbers.map((num, index) => {
              const angle = (index * 360) / 37;
              const color = getNumberColor(num);
              return (
                <div
                  key={num}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'center center'
                  }}
                >
                  <div 
                    className={`absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-8 md:w-8 md:h-10 flex items-center justify-center text-xs md:text-sm font-bold text-white rounded border border-yellow-300 shadow-lg ${
                      color === 'red' ? 'bg-gradient-to-b from-red-600 to-red-800 border-red-400' : 
                      color === 'black' ? 'bg-gradient-to-b from-gray-900 to-black border-gray-600' : 'bg-gradient-to-b from-green-600 to-green-800 border-green-400'
                    }`}
                  >
                    {num}
                  </div>
                  {/* Separator lines */}
                  <div className="absolute top-0 left-1/2 w-px h-16 bg-gradient-to-b from-yellow-400 to-transparent transform -translate-x-1/2"></div>
                </div>
              );
            })}
            
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full border-4 border-yellow-800 shadow-lg flex items-center justify-center">
              <div className="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Ball */}
          <div 
            className="absolute inset-0 transition-transform duration-4000 ease-out"
            style={{ transform: `rotate(${ballRotation}deg)` }}
          >
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-white via-gray-100 to-gray-300 rounded-full shadow-xl border border-gray-400 z-20"></div>
          </div>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500 z-30 drop-shadow-lg"></div>
        </div>
      </div>

      {/* Last Result */}
      {lastResult !== null && (
        <div className="text-center mb-6 relative z-10">
          <div className="text-white/70 text-sm mb-2">ÚLTIMO RESULTADO:</div>
          <div className={`inline-block px-6 py-3 rounded-full text-white font-bold text-xl md:text-2xl shadow-lg border-2 ${
            getNumberColor(lastResult) === 'red' ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-400' :
            getNumberColor(lastResult) === 'black' ? 'bg-gradient-to-br from-gray-800 to-black border-gray-400' : 'bg-gradient-to-br from-green-500 to-green-700 border-green-400'
          }`}>
            {lastResult}
          </div>
        </div>
      )}

      {/* Betting Options */}
      <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
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
      <Button
        onClick={spin}
        disabled={isSpinning || !selectedBet}
        className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-bold text-base md:text-xl py-3 md:py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100 relative z-10 border-2 border-red-400"
      >
        {isSpinning ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
            GIRANDO A ROLETA...
          </div>
        ) : (
          "🎲 GIRAR ROLETA (10 moedas)"
        )}
      </Button>

      {/* Casino atmosphere */}
      <div className="absolute bottom-2 left-2 text-red-500/30 text-2xl animate-pulse">♠️</div>
      <div className="absolute top-2 right-2 text-red-500/30 text-2xl animate-pulse" style={{ animationDelay: '1s' }}>♦️</div>
      <div className="absolute bottom-2 right-2 text-red-500/30 text-2xl animate-pulse" style={{ animationDelay: '2s' }}>♣️</div>
    </div>
  );
};

export default Roulette;
