
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface BlackjackProps {
  onWin: (amount: number) => void;
  onSpin: () => boolean;
}

const Blackjack = ({ onWin, onSpin }: BlackjackProps) => {
  const [playerCards, setPlayerCards] = useState<number[]>([]);
  const [dealerCards, setDealerCards] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting');
  const [showDealerCard, setShowDealerCard] = useState(false);
  const { toast } = useToast();

  const getRandomCard = () => Math.floor(Math.random() * 10) + 1;

  const calculateSum = (cards: number[]) => {
    let sum = cards.reduce((acc, card) => acc + card, 0);
    // Simplificado: sem ás especial
    return sum;
  };

  const startGame = () => {
    if (!onSpin()) {
      toast({
        title: "Moedas insuficientes!",
        description: "Você precisa de pelo menos 10 moedas para jogar.",
        variant: "destructive",
      });
      return;
    }

    const playerHand = [getRandomCard(), getRandomCard()];
    const dealerHand = [getRandomCard(), getRandomCard()];
    
    setPlayerCards(playerHand);
    setDealerCards(dealerHand);
    setGameState('playing');
    setShowDealerCard(false);
  };

  const hit = () => {
    const newCard = getRandomCard();
    const newCards = [...playerCards, newCard];
    setPlayerCards(newCards);
    
    if (calculateSum(newCards) > 21) {
      endGame(newCards, dealerCards);
    }
  };

  const stand = () => {
    setShowDealerCard(true);
    let dealerHand = [...dealerCards];
    
    // Dealer pega cartas até 17
    while (calculateSum(dealerHand) < 17) {
      dealerHand.push(getRandomCard());
    }
    
    setDealerCards(dealerHand);
    endGame(playerCards, dealerHand);
  };

  const endGame = (playerHand: number[], dealerHand: number[]) => {
    const playerSum = calculateSum(playerHand);
    const dealerSum = calculateSum(dealerHand);
    
    setGameState('finished');
    setShowDealerCard(true);
    
    let winAmount = 0;
    let message = '';
    
    if (playerSum > 21) {
      message = 'Você estourou! Dealer ganha.';
    } else if (dealerSum > 21) {
      message = 'Dealer estourou! Você ganha!';
      winAmount = 20;
    } else if (playerSum > dealerSum) {
      message = 'Você ganha!';
      winAmount = 20;
    } else if (playerSum < dealerSum) {
      message = 'Dealer ganha!';
    } else {
      message = 'Empate!';
      winAmount = 10; // Devolve a aposta
    }
    
    if (winAmount > 0) {
      onWin(winAmount);
    }
    
    toast({
      title: message,
      description: winAmount > 0 ? `Você ganhou ${winAmount} moedas!` : '',
      className: winAmount > 0 ? "bg-gradient-to-r from-green-400 to-blue-500 text-white border-none" : undefined,
    });
  };

  const resetGame = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setGameState('waiting');
    setShowDealerCard(false);
  };

  return (
    <div className="bg-gradient-to-b from-green-800 to-green-900 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border-2 md:border-4 border-yellow-400/50 max-w-sm md:max-w-none mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 text-center mb-6">🃏 BLACKJACK 🃏</h2>
      
      {/* Dealer Cards */}
      <div className="mb-6">
        <h3 className="text-lg md:text-xl text-white mb-2">Dealer: {showDealerCard ? calculateSum(dealerCards) : '?'}</h3>
        <div className="flex gap-2 justify-center">
          {dealerCards.map((card, index) => (
            <div key={index} className="w-12 h-16 md:w-16 md:h-20 bg-white rounded-lg flex items-center justify-center text-black font-bold text-lg md:text-xl border-2 border-gray-300">
              {index === 0 || showDealerCard ? card : '?'}
            </div>
          ))}
        </div>
      </div>
      
      {/* Player Cards */}
      <div className="mb-6">
        <h3 className="text-lg md:text-xl text-white mb-2">Você: {playerCards.length > 0 ? calculateSum(playerCards) : 0}</h3>
        <div className="flex gap-2 justify-center">
          {playerCards.map((card, index) => (
            <div key={index} className="w-12 h-16 md:w-16 md:h-20 bg-white rounded-lg flex items-center justify-center text-black font-bold text-lg md:text-xl border-2 border-gray-300">
              {card}
            </div>
          ))}
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex flex-col gap-3">
        {gameState === 'waiting' && (
          <Button onClick={startGame} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-full w-full">
            🎮 JOGAR (10 moedas)
          </Button>
        )}
        
        {gameState === 'playing' && (
          <div className="flex gap-2">
            <Button onClick={hit} className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-full flex-1">
              📈 PEDIR
            </Button>
            <Button onClick={stand} className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-full flex-1">
              ✋ PARAR
            </Button>
          </div>
        )}
        
        {gameState === 'finished' && (
          <Button onClick={resetGame} className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-3 rounded-full w-full">
            🔄 JOGAR NOVAMENTE
          </Button>
        )}
      </div>
    </div>
  );
};

export default Blackjack;
