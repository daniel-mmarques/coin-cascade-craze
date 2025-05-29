
import { useEffect, useState } from 'react';

interface SlotReelProps {
  symbol: string;
  isSpinning: boolean;
  delay?: number;
}

const symbols = ['🍒', '🍋', '🔔', '💎', '⭐', '7️⃣'];

const SlotReel = ({ symbol, isSpinning, delay = 0 }: SlotReelProps) => {
  const [currentSymbol, setCurrentSymbol] = useState(symbol);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      setTimeout(() => {
        setSpinning(true);
        
        // Create spinning effect
        const interval = setInterval(() => {
          setCurrentSymbol(symbols[Math.floor(Math.random() * symbols.length)]);
        }, 100);

        // Stop spinning after delay
        setTimeout(() => {
          clearInterval(interval);
          setCurrentSymbol(symbol);
          setSpinning(false);
        }, 2500 + delay);
      }, delay);
    }
  }, [isSpinning, symbol, delay]);

  return (
    <div className="relative">
      <div 
        className={`
          w-24 h-24 bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl 
          flex items-center justify-center text-4xl font-bold
          border-2 border-yellow-400/50 shadow-inner
          transition-transform duration-100
          ${spinning ? 'animate-bounce' : ''}
        `}
      >
        <div className={`transition-all duration-200 ${spinning ? 'blur-sm scale-110' : ''}`}>
          {currentSymbol}
        </div>
      </div>
      
      {/* Glow effect when spinning */}
      {spinning && (
        <div className="absolute inset-0 rounded-xl bg-yellow-400/20 animate-pulse"></div>
      )}
    </div>
  );
};

export default SlotReel;
