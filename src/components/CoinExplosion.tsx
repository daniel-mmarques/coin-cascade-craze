
import { useEffect, useState } from 'react';

interface Coin {
  id: number;
  x: number;
  y: number;
  delay: number;
  rotation: number;
}

const CoinExplosion = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    // Generate coins
    const newCoins: Coin[] = [];
    for (let i = 0; i < 30; i++) {
      newCoins.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 100,
        delay: Math.random() * 1000,
        rotation: Math.random() * 360,
      });
    }
    setCoins(newCoins);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute text-6xl animate-bounce"
          style={{
            left: coin.x,
            bottom: -100,
            animationDelay: `${coin.delay}ms`,
            animationDuration: '2s',
            transform: `rotate(${coin.rotation}deg)`,
          }}
        >
          <div className="animate-spin" style={{ animationDuration: '0.5s' }}>
            🪙
          </div>
        </div>
      ))}
      
      {/* Confetti effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-8xl animate-ping">🎉</div>
      </div>
      
      {/* Victory text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl font-bold text-yellow-400 animate-pulse">
          WINNER!
        </div>
      </div>
    </div>
  );
};

export default CoinExplosion;
