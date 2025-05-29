
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
        }, 80); // Mais rápido para efeito mais dinâmico

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
          w-24 h-24 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-800 rounded-xl 
          flex items-center justify-center text-4xl font-bold
          border-2 border-yellow-400/50 shadow-inner
          transition-all duration-200 transform
          ${spinning ? 'animate-pulse scale-110 rotate-2' : 'hover:scale-105'}
        `}
        style={{
          boxShadow: spinning ? '0 0 20px rgba(255, 215, 0, 0.6)' : '0 4px 15px rgba(0, 0, 0, 0.3)',
          animation: spinning ? 'spin-reel 0.1s linear infinite' : undefined,
        }}
      >
        <div className={`transition-all duration-200 ${spinning ? 'blur-sm scale-125' : 'drop-shadow-lg'}`}>
          {currentSymbol}
        </div>
      </div>
      
      {/* Glow effect when spinning */}
      {spinning && (
        <div className="absolute inset-0 rounded-xl bg-yellow-400/30 animate-pulse blur-sm"></div>
      )}
      
      {/* Sparkles effect when not spinning */}
      {!spinning && (
        <>
          <div className="absolute -top-2 -right-2 text-xs animate-ping opacity-70">✨</div>
          <div className="absolute -bottom-2 -left-2 text-xs animate-ping opacity-70" style={{ animationDelay: '500ms' }}>⭐</div>
        </>
      )}
    </div>
  );
};

export default SlotReel;
