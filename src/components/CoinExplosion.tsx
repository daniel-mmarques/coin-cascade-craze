
import { useEffect, useState } from 'react';

interface Coin {
  id: number;
  x: number;
  y: number;
  delay: number;
  rotation: number;
  velocity: number;
}

const CoinExplosion = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    // Generate coins que caem do topo
    const newCoins: Coin[] = [];
    for (let i = 0; i < 50; i++) {
      newCoins.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -100 - Math.random() * 200, // Começam acima da tela
        delay: Math.random() * 2000,
        rotation: Math.random() * 360,
        velocity: 3 + Math.random() * 4, // Velocidade de queda
      });
    }
    setCoins(newCoins);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute text-4xl animate-bounce"
          style={{
            left: coin.x,
            top: coin.y,
            animationDelay: `${coin.delay}ms`,
            animationDuration: '3s',
            transform: `rotate(${coin.rotation}deg)`,
            animation: `fall ${3 + Math.random() * 2}s ease-in ${coin.delay}ms forwards`,
          }}
        >
          <div 
            className="animate-spin" 
            style={{ 
              animationDuration: '0.8s',
              filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))'
            }}
          >
            🪙
          </div>
        </div>
      ))}
      
      {/* Efeito de confete */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-8xl animate-ping opacity-80">🎉</div>
      </div>
      
      {/* Texto de vitória animado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl font-bold text-yellow-400 animate-pulse drop-shadow-lg">
          <span className="animate-bounce inline-block" style={{ animationDelay: '0ms' }}>V</span>
          <span className="animate-bounce inline-block" style={{ animationDelay: '100ms' }}>I</span>
          <span className="animate-bounce inline-block" style={{ animationDelay: '200ms' }}>T</span>
          <span className="animate-bounce inline-block" style={{ animationDelay: '300ms' }}>Ó</span>
          <span className="animate-bounce inline-block" style={{ animationDelay: '400ms' }}>R</span>
          <span className="animate-bounce inline-block" style={{ animationDelay: '500ms' }}>I</span>
          <span className="animate-bounce inline-block" style={{ animationDelay: '600ms' }}>A</span>
          <span className="animate-bounce inline-block" style={{ animationDelay: '700ms' }}>!</span>
        </div>
      </div>
      
      {/* Brilhos extras */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-400 rounded-full blur-xl animate-ping opacity-60"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-orange-400 rounded-full blur-xl animate-ping opacity-60" style={{ animationDelay: '500ms' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-yellow-300 rounded-full blur-xl animate-ping opacity-60" style={{ animationDelay: '1000ms' }}></div>
    </div>
  );
};

export default CoinExplosion;
