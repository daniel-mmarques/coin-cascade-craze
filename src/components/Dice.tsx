
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DiceProps {
  onWin: (amount: number) => void;
  onSpin: (amount: number) => boolean;
}

const Dice = ({ onWin, onSpin }: DiceProps) => {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [selectedBet, setSelectedBet] = useState<'high' | 'low' | 'seven' | null>(null);
  const [lastSum, setLastSum] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(5);
  const { toast } = useToast();

  const rollDice = async () => {
    if (!selectedBet) {
      toast({
        title: "Selecione uma aposta!",
        description: "Escolha Alto, Baixo ou Sete antes de rolar os dados.",
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

    setIsRolling(true);
    
    // Animate dice rolling
    const rollAnimation = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
    }, 100);

    setTimeout(() => {
      clearInterval(rollAnimation);
      
      const finalDice1 = Math.floor(Math.random() * 6) + 1;
      const finalDice2 = Math.floor(Math.random() * 6) + 1;
      const sum = finalDice1 + finalDice2;
      
      setDice1(finalDice1);
      setDice2(finalDice2);
      setLastSum(sum);
      setIsRolling(false);
      
      let multiplier = 0;
      let message = '';
      
      if (
        (selectedBet === 'high' && sum >= 8) ||
        (selectedBet === 'low' && sum <= 6) ||
        (selectedBet === 'seven' && sum === 7)
      ) {
        if (selectedBet === 'seven') {
          multiplier = 5; // 5x payout for seven
          message = '🎉 SETE! Pagamento 5x!';
        } else {
          multiplier = 2; // 2x payout for high/low
          message = `🎉 ${selectedBet.toUpperCase()}! Você ganhou!`;
        }
        
        const winAmount = multiplier * betAmount;
        onWin(winAmount);
        toast({
          title: message,
          description: `Dados: ${finalDice1} + ${finalDice2} = ${sum} - Você ganhou ${winAmount} moedas!`,
          className: "bg-gradient-to-r from-green-400 to-blue-500 text-white border-none",
        });
      } else {
        toast({
          title: "Tente novamente!",
          description: `Dados: ${finalDice1} + ${finalDice2} = ${sum}`,
        });
      }
    }, 2000);
  };

  const getDotPattern = (num: number) => {
    const patterns = {
      1: [false, false, false, false, true, false, false, false, false],
      2: [true, false, false, false, false, false, false, false, true],
      3: [true, false, false, false, true, false, false, false, true],
      4: [true, false, true, false, false, false, true, false, true],
      5: [true, false, true, false, true, false, true, false, true],
      6: [true, false, true, true, false, true, true, false, true],
    };
    return patterns[num as keyof typeof patterns] || patterns[1];
  };

  const DiceComponent = ({ value, isAnimating }: { value: number; isAnimating: boolean }) => (
    <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white to-gray-200 rounded-xl border-2 border-gray-300 shadow-lg flex items-center justify-center transform transition-transform duration-200 ${
      isAnimating ? 'animate-spin' : 'hover:scale-105'
    }`}>
      <div className="grid grid-cols-3 gap-1 p-2">
        {getDotPattern(value).map((dot, index) => (
          <div
            key={index}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-200 ${
              dot ? 'bg-red-600 shadow-sm' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border-2 md:border-4 border-blue-500/50 max-w-sm md:max-w-none mx-auto relative overflow-hidden">
      {/* Casino lights effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 animate-pulse"></div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-blue-400 text-center mb-6 relative z-10">
        🎲 DADOS MÁGICOS 🎲
      </h2>
      
      {/* Dice Display */}
      <div className="flex justify-center items-center gap-4 mb-6 relative z-10">
        <DiceComponent value={dice1} isAnimating={isRolling} />
        <div className="text-2xl md:text-3xl text-white font-bold">+</div>
        <DiceComponent value={dice2} isAnimating={isRolling} />
        <div className="text-2xl md:text-3xl text-white font-bold">=</div>
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl border-2 border-yellow-300 shadow-lg flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold text-white">
            {isRolling ? '?' : dice1 + dice2}
          </span>
        </div>
      </div>

      {/* Last Result */}
      {lastSum !== null && !isRolling && (
        <div className="text-center mb-6 relative z-10">
          <div className="text-white/70 text-sm mb-2">ÚLTIMO RESULTADO:</div>
          <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-xl md:text-2xl shadow-lg border-2 border-yellow-300">
            {lastSum}
          </div>
        </div>
      )}

      {/* Bet Amount Selector */}
      <div className="mb-4 text-center relative z-10">
        <div className="text-white/70 text-sm mb-2">VALOR DA APOSTA:</div>
        <div className="flex justify-center items-center gap-2">
          <Button
            onClick={() => setBetAmount(Math.max(5, betAmount - 5))}
            disabled={isRolling || betAmount <= 5}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm"
          >
            -5
          </Button>
          <div className="bg-black/50 px-4 py-2 rounded-lg border border-yellow-400/30">
            <span className="text-yellow-400 font-bold text-lg">{betAmount} 🪙</span>
          </div>
          <Button
            onClick={() => setBetAmount(betAmount + 5)}
            disabled={isRolling}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
          >
            +5
          </Button>
        </div>
      </div>

      {/* Betting Options */}
      <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
        <Button
          onClick={() => setSelectedBet('low')}
          disabled={isRolling}
          className={`py-4 md:py-6 rounded-xl font-bold text-white text-sm md:text-base transition-all duration-200 ${
            selectedBet === 'low' 
              ? 'bg-gradient-to-br from-green-500 to-green-700 ring-4 ring-green-400 scale-105 shadow-lg' 
              : 'bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 shadow-md hover:scale-102'
          }`}
        >
          📉 BAIXO<br/>
          <span className="text-xs opacity-80">(2-6) Paga 2x</span>
        </Button>
        <Button
          onClick={() => setSelectedBet('seven')}
          disabled={isRolling}
          className={`py-4 md:py-6 rounded-xl font-bold text-white text-sm md:text-base transition-all duration-200 ${
            selectedBet === 'seven' 
              ? 'bg-gradient-to-br from-yellow-500 to-orange-600 ring-4 ring-yellow-400 scale-105 shadow-lg' 
              : 'bg-gradient-to-br from-yellow-600 to-orange-700 hover:from-yellow-500 hover:to-orange-600 shadow-md hover:scale-102'
          }`}
        >
          7️⃣ SETE<br/>
          <span className="text-xs opacity-80">Paga 5x</span>
        </Button>
        <Button
          onClick={() => setSelectedBet('high')}
          disabled={isRolling}
          className={`py-4 md:py-6 rounded-xl font-bold text-white text-sm md:text-base transition-all duration-200 ${
            selectedBet === 'high' 
              ? 'bg-gradient-to-br from-red-500 to-red-700 ring-4 ring-red-400 scale-105 shadow-lg' 
              : 'bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 shadow-md hover:scale-102'
          }`}
        >
          📈 ALTO<br/>
          <span className="text-xs opacity-80">(8-12) Paga 2x</span>
        </Button>
      </div>

      {/* Roll Button */}
      <div className="text-center">
      <Button
        onClick={rollDice}
        disabled={isRolling || !selectedBet}
        className="w-3/6 bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-800 hover:from-blue-700 hover:via-purple-800 hover:to-indigo-900 text-white font-bold text-base md:text-xl py-3 md:py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100 relative z-10 border-2 border-blue-400"
      >
        {isRolling ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-bounce h-5 w-5 md:h-6 md:w-6 text-2xl">🎲</div>
            ROLANDO OS DADOS...
          </div>
        ) : (
          `🎲 ROLAR DADOS (${betAmount} moedas)`
        )}
      </Button>
        </div>

      {/* Casino atmosphere */}
      <div className="absolute bottom-2 left-2 text-blue-500/30 text-2xl animate-pulse">🎲</div>
      <div className="absolute top-2 right-2 text-purple-500/30 text-2xl animate-pulse" style={{ animationDelay: '1s' }}>🎰</div>
      <div className="absolute bottom-2 right-2 text-indigo-500/30 text-2xl animate-pulse" style={{ animationDelay: '2s' }}>✨</div>
    </div>
  );
};

export default Dice;
