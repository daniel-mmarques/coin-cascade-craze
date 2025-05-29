
import { useState, useEffect } from 'react';
import SlotMachine from '@/components/SlotMachine';
import CoinExplosion from '@/components/CoinExplosion';

const Index = () => {
  const [showCoins, setShowCoins] = useState(false);
  const [coins, setCoins] = useState(100);

  const handleWin = (winAmount: number) => {
    setCoins(prev => prev + winAmount);
    setShowCoins(true);
    setTimeout(() => setShowCoins(false), 3000);
  };

  const handleSpin = () => {
    if (coins >= 10) {
      setCoins(prev => prev - 10);
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-cyan-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 mb-4 animate-fade-in">
            🎰 LUCKY SLOTS 🎰
          </h1>
          <p className="text-xl text-white/80 animate-fade-in">
            Spin to win big! Each spin costs 10 coins
          </p>
        </div>

        {/* Coins Display */}
        <div className="mb-8 bg-black/30 backdrop-blur-sm rounded-2xl px-8 py-4 border border-yellow-400/30">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🪙</span>
            <span className="text-2xl font-bold text-yellow-400">{coins}</span>
            <span className="text-white/70">coins</span>
          </div>
        </div>

        {/* Slot Machine */}
        <SlotMachine onWin={handleWin} onSpin={handleSpin} />

        {/* Instructions */}
        <div className="mt-8 text-center text-white/60 max-w-md">
          <p className="mb-2">🎯 Match 3 symbols to win!</p>
          <p className="mb-2">💰 Jackpot: 1000 coins</p>
          <p>🍒 Cherry: 50 coins | 🍋 Lemon: 30 coins | 🔔 Bell: 20 coins</p>
        </div>
      </div>

      {/* Coin Explosion */}
      {showCoins && <CoinExplosion />}
    </div>
  );
};

export default Index;
