
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
        <div className="absolute top-10 left-10 md:top-20 md:left-20 w-16 h-16 md:w-32 md:h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-20 h-20 md:w-40 md:h-40 bg-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-60 md:h-60 bg-cyan-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 mb-2 md:mb-4 animate-fade-in">
            🎰 LUCKY SLOTS 🎰
          </h1>
          <p className="text-sm md:text-xl text-white/80 animate-fade-in px-4">
            Spin to win big! Each spin costs 10 coins
          </p>
        </div>

        {/* Coins Display */}
        <div className="mb-6 md:mb-8 bg-black/30 backdrop-blur-sm rounded-xl md:rounded-2xl px-6 md:px-8 py-3 md:py-4 border border-yellow-400/30">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-2xl md:text-3xl">🪙</span>
            <span className="text-xl md:text-2xl font-bold text-yellow-400">{coins}</span>
            <span className="text-sm md:text-base text-white/70">coins</span>
          </div>
        </div>

        {/* Slot Machine */}
        <SlotMachine onWin={handleWin} onSpin={handleSpin} />

        {/* Instructions */}
        <div className="mt-6 md:mt-8 text-center text-white/60 max-w-sm md:max-w-md px-4">
          <p className="mb-2 text-sm md:text-base">🎯 Match 3 symbols to win!</p>
          <p className="mb-2 text-sm md:text-base">💰 Jackpot: 1000 coins</p>
          <p className="text-xs md:text-base">🍒 Cherry: 50 coins | 🍋 Lemon: 30 coins | 🔔 Bell: 20 coins</p>
        </div>
      </div>

      {/* Coin Explosion */}
      {showCoins && <CoinExplosion />}
    </div>
  );
};

export default Index;
