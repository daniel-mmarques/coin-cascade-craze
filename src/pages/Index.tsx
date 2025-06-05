
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import SlotMachine from '@/components/SlotMachine';
import Blackjack from '@/components/Blackjack';
import Roulette from '@/components/Roulette';
import CoinShop from '@/components/CoinShop';
import CoinExplosion from '@/components/CoinExplosion';
import { useCoins } from '@/hooks/useCoins';

type GameType = 'slots' | 'blackjack' | 'roulette' | 'shop';

const Index = () => {
  const [showCoins, setShowCoins] = useState(false);
  const [currentGame, setCurrentGame] = useState<GameType>('slots');
  const { coins, addCoins, spendCoins } = useCoins();

  const handleWin = (winAmount: number) => {
    addCoins(winAmount);
    setShowCoins(true);
    setTimeout(() => setShowCoins(false), 3000);
  };

  const handleSpin = () => {
    return spendCoins(10);
  };

  const handlePurchase = (amount: number) => {
    addCoins(amount);
  };

  const games = {
    slots: { name: '🎰 Slots', component: <SlotMachine onWin={handleWin} onSpin={handleSpin} /> },
    blackjack: { name: '🃏 Blackjack', component: <Blackjack onWin={handleWin} onSpin={handleSpin} /> },
    roulette: { name: '🎲 Roleta', component: <Roulette onWin={handleWin} onSpin={handleSpin} /> },
    shop: { name: '🛒 Loja', component: <CoinShop onPurchase={handlePurchase} /> },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 md:top-20 md:left-20 w-16 h-16 md:w-32 md:h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 w-20 h-20 md:w-40 md:h-40 bg-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 md:w-60 md:h-60 bg-cyan-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Tigrinho no fundo */}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-6xl md:text-8xl opacity-30 animate-bounce">
          🐅
        </div>
        <div className="absolute top-1/4 left-4 md:left-8 text-4xl md:text-6xl opacity-20 animate-pulse">
          🐅
        </div>
        <div className="absolute top-2/3 right-1/4 text-5xl md:text-7xl opacity-25 animate-pulse" style={{ animationDelay: '1s' }}>
          🐅
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 mb-2 md:mb-4 animate-fade-in">
            🎰 CASINO DO TIGRINHO 🐅
          </h1>
          <p className="text-sm md:text-xl text-white/80 animate-fade-in px-4">
            Três jogos emocionantes! Cada jogada custa 10 moedas
          </p>
        </div>

        {/* Coins Display */}
        <div className="mb-6 md:mb-8 bg-black/30 backdrop-blur-sm rounded-xl md:rounded-2xl px-6 md:px-8 py-3 md:py-4 border border-yellow-400/30">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-2xl md:text-3xl">🪙</span>
            <span className="text-xl md:text-2xl font-bold text-yellow-400">{coins}</span>
            <span className="text-sm md:text-base text-white/70">moedas</span>
          </div>
        </div>

        {/* Game Navigation */}
        <div className="mb-6 md:mb-8 flex flex-wrap justify-center gap-2">
          {Object.entries(games).map(([key, game]) => (
            <Button
              key={key}
              onClick={() => setCurrentGame(key as GameType)}
              className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${
                currentGame === key
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black ring-2 ring-yellow-300'
                  : 'bg-black/50 text-white hover:bg-black/70 border border-yellow-400/30'
              }`}
            >
              {game.name}
            </Button>
          ))}
        </div>

        {/* Current Game */}
        {games[currentGame].component}

        {/* Instructions */}
        <div className="mt-6 md:mt-8 text-center text-white/60 max-w-sm md:max-w-md px-4">
          {currentGame === 'slots' && (
            <>
              <p className="mb-2 text-sm md:text-base">🎯 Combine 3 símbolos para ganhar!</p>
              <p className="mb-2 text-sm md:text-base">💎 Diamante: 1000 moedas | 7️⃣ Sete: 500 moedas</p>
              <p className="text-xs md:text-base">⭐ Estrela: 200 | 🍒 Cereja: 100 | 🔔 Sino: 50</p>
            </>
          )}
          {currentGame === 'blackjack' && (
            <>
              <p className="mb-2 text-sm md:text-base">🎯 Chegue o mais próximo de 21 sem estourar!</p>
              <p className="text-xs md:text-base">💰 Ganhe: 20 moedas | Empate: 10 moedas</p>
            </>
          )}
          {currentGame === 'roulette' && (
            <>
              <p className="mb-2 text-sm md:text-base">🎯 Aposte em uma cor e torça!</p>
              <p className="text-xs md:text-base">🔴🔵 Vermelho/Preto: 2x | 🟢 Verde: 35x</p>
            </>
          )}
          {currentGame === 'shop' && (
            <p className="text-xs md:text-base">💳 Compre moedas para continuar jogando!</p>
          )}
        </div>
      </div>

      {/* Coin Explosion */}
      {showCoins && <CoinExplosion />}
    </div>
  );
};

export default Index;
