
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import SlotMachine from '@/components/SlotMachine';
import Dice from '@/components/Dice';
import Roulette from '@/components/Roulette';
import CoinExplosion from '@/components/CoinExplosion';
import { useCoins } from '@/hooks/useCoins';

type GameType = 'slots' | 'dice' | 'roulette';

const Index = () => {
  const [showCoins, setShowCoins] = useState(false);
  const [currentGame, setCurrentGame] = useState<GameType>('slots');
  const { coins, addCoins, spendCoins } = useCoins();

  const handleWin = (winAmount: number) => {
    addCoins(winAmount);
    setShowCoins(true);
    setTimeout(() => setShowCoins(false), 3000);
  };

  const handleSpin = (betAmount: number) => {
    return spendCoins(betAmount);
  };

  const games = {
    slots: { name: '🎰 Slots', component: <SlotMachine onWin={handleWin} onSpin={handleSpin} /> },
    dice: { name: '🎲 Dados', component: <Dice onWin={handleWin} onSpin={handleSpin} /> },
    roulette: { name: '🎡 Roleta', component: <Roulette onWin={handleWin} onSpin={handleSpin} /> },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-blue-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Subtle decorative elements */}
        <div className="absolute bottom-8 right-8 text-6xl opacity-10">♠</div>
        <div className="absolute top-1/4 left-8 text-4xl opacity-10">♦</div>
        <div className="absolute top-2/3 right-1/4 text-5xl opacity-10">♣</div>
        <div className="absolute top-1/3 right-1/3 text-4xl opacity-10">♥</div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        {/* Professional Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 mb-4 tracking-wide">
            🎲 CASSINO ROYAL 🎰
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-4"></div>
          <p className="text-lg md:text-xl text-gray-300 font-medium">
            Jogos Premium • Apostas a partir de 5 moedas
          </p>
        </div>

        {/* Coins Display */}
        <div className="mb-8 bg-gradient-to-r from-slate-800 to-gray-800 backdrop-blur-sm rounded-xl px-8 py-4 border border-amber-400/20 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🪙</span>
            <span className="text-2xl font-bold text-amber-400">{coins}</span>
            <span className="text-base text-gray-300 font-medium">moedas</span>
          </div>
        </div>

        {/* Game Navigation */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {Object.entries(games).map(([key, game]) => (
            <Button
              key={key}
              onClick={() => setCurrentGame(key as GameType)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentGame === key
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black shadow-lg scale-105'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border border-gray-600 hover:border-amber-400/50'
              }`}
            >
              {game.name}
            </Button>
          ))}
        </div>

        {/* Current Game */}
        <div className="w-full max-w-4xl">
          {games[currentGame].component}
        </div>

        {/* Professional Instructions */}
        <div className="mt-8 text-center text-gray-400 max-w-2xl px-4">
          {currentGame === 'slots' && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-gray-700">
              <p className="mb-2 text-base font-medium text-gray-300">🎯 Combine 3 símbolos para ganhar!</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>💎 Diamante: 100x</p>
                <p>7️⃣ Sete: 50x</p>
                <p>⭐ Estrela: 20x</p>
                <p>🍒 Cereja: 10x</p>
                <p>🔔 Sino: 5x</p>
                <p>🍋 Limão: 3x</p>
              </div>
            </div>
          )}
          {currentGame === 'dice' && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-gray-700">
              <p className="mb-2 text-base font-medium text-gray-300">🎯 Aposte no resultado da soma dos dados!</p>
              <p className="text-sm">🎲 Baixo/Alto: 2x | Sete: 5x</p>
            </div>
          )}
          {currentGame === 'roulette' && (
            <div className="bg-slate-800/50 rounded-lg p-4 border border-gray-700">
              <p className="mb-2 text-base font-medium text-gray-300">🎯 Aposte em uma cor e torça!</p>
              <p className="text-sm">🔴🔵 Vermelho/Preto: 2x | 🟢 Verde: 35x</p>
            </div>
          )}
        </div>
      </div>

      {/* Coin Explosion */}
      {showCoins && <CoinExplosion />}
    </div>
  );
};

export default Index;
