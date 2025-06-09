
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface BlackjackProps {
  onWin: (amount: number) => void;
  onSpin: (amount: number) => boolean;
}

interface Card {
  suit: string;
  value: string;
  numValue: number;
}

const Blackjack = ({ onWin, onSpin }: BlackjackProps) => {
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [dealerRevealed, setDealerRevealed] = useState(false);
  const [betAmount, setBetAmount] = useState(5);
  const { toast } = useToast();

  const suits = ['♠️', '♥️', '♦️', '♣️'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const createDeck = (): Card[] => {
    const deck: Card[] = [];
    suits.forEach(suit => {
      values.forEach(value => {
        let numValue = parseInt(value);
        if (value === 'A') numValue = 11;
        else if (['J', 'Q', 'K'].includes(value)) numValue = 10;
        deck.push({ suit, value, numValue });
      });
    });
    return shuffleDeck(deck);
  };

  const shuffleDeck = (deck: Card[]): Card[] => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const calculateHandValue = (cards: Card[]): number => {
    let value = 0;
    let aces = 0;
    
    cards.forEach(card => {
      if (card.value === 'A') {
        aces++;
        value += 11;
      } else {
        value += card.numValue;
      }
    });
    
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
    
    return value;
  };

  const startGame = () => {
    if (!onSpin(betAmount)) {
      toast({
        title: "Moedas insuficientes!",
        description: `Você precisa de pelo menos ${betAmount} moedas para apostar.`,
        variant: "destructive",
      });
      return;
    }

    const deck = createDeck();
    const newPlayerCards = [deck[0], deck[2]];
    const newDealerCards = [deck[1], deck[3]];
    
    setPlayerCards(newPlayerCards);
    setDealerCards(newDealerCards);
    setGameStarted(true);
    setGameEnded(false);
    setDealerRevealed(false);

    // Check for immediate blackjack
    if (calculateHandValue(newPlayerCards) === 21) {
      setTimeout(() => {
        endGame(newPlayerCards, newDealerCards);
      }, 1000);
    }
  };

  const hit = () => {
    const deck = createDeck();
    const newCard = deck[Math.floor(Math.random() * deck.length)];
    const newPlayerCards = [...playerCards, newCard];
    setPlayerCards(newPlayerCards);

    const playerValue = calculateHandValue(newPlayerCards);
    if (playerValue > 21) {
      setTimeout(() => {
        endGame(newPlayerCards, dealerCards);
      }, 1000);
    }
  };

  const stand = () => {
    setDealerRevealed(true);
    let newDealerCards = [...dealerCards];
    
    // Dealer draws until 17 or higher
    const drawDealerCards = () => {
      const deck = createDeck();
      while (calculateHandValue(newDealerCards) < 17) {
        const newCard = deck[Math.floor(Math.random() * deck.length)];
        newDealerCards = [...newDealerCards, newCard];
      }
      setDealerCards(newDealerCards);
      
      setTimeout(() => {
        endGame(playerCards, newDealerCards);
      }, 1500);
    };

    setTimeout(drawDealerCards, 1000);
  };

  const endGame = (finalPlayerCards: Card[], finalDealerCards: Card[]) => {
    const playerValue = calculateHandValue(finalPlayerCards);
    const dealerValue = calculateHandValue(finalDealerCards);
    
    setGameEnded(true);
    setDealerRevealed(true);
    
    let message = '';
    let multiplier = 0;
    
    if (playerValue > 21) {
      message = '💥 Estourou! Você perdeu!';
      multiplier = 0;
    } else if (dealerValue > 21) {
      message = '🎉 Dealer estourou! Você ganhou!';
      multiplier = 2;
    } else if (playerValue === 21 && finalPlayerCards.length === 2) {
      message = '🎉 BLACKJACK! Vitória especial!';
      multiplier = 2.5;
    } else if (playerValue > dealerValue) {
      message = '🎉 Você ganhou!';
      multiplier = 2;
    } else if (playerValue === dealerValue) {
      message = '🤝 Empate! Aposta devolvida';
      multiplier = 1;
    } else {
      message = '😔 Dealer ganhou!';
      multiplier = 0;
    }
    
    const winAmount = Math.floor(multiplier * betAmount);
    if (winAmount > 0) {
      onWin(winAmount);
    }
    
    toast({
      title: message,
      description: `Você: ${playerValue} | Dealer: ${dealerValue}${winAmount > 0 ? ` | +${winAmount} moedas` : ''}`,
      className: multiplier > 0 ? "bg-gradient-to-r from-green-400 to-blue-500 text-white border-none" : "",
    });
  };

  const CardComponent = ({ card, hidden = false }: { card: Card; hidden?: boolean }) => (
    <div className={`w-16 h-24 md:w-20 md:h-28 rounded-lg border-2 border-gray-300 shadow-lg flex flex-col items-center justify-between p-1 ${
      hidden ? 'bg-gradient-to-br from-blue-800 to-blue-900' : 'bg-white'
    }`}>
      {hidden ? (
        <div className="text-center text-white text-2xl">🂠</div>
      ) : (
        <>
          <div className={`text-lg md:text-xl font-bold ${
            ['♥️', '♦️'].includes(card.suit) ? 'text-red-500' : 'text-black'
          }`}>
            {card.value}
          </div>
          <div className="text-2xl md:text-3xl">{card.suit}</div>
          <div className={`text-lg md:text-xl font-bold transform rotate-180 ${
            ['♥️', '♦️'].includes(card.suit) ? 'text-red-500' : 'text-black'
          }`}>
            {card.value}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-green-800 via-green-900 to-black rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl border-2 md:border-4 border-green-600/50 max-w-sm md:max-w-none mx-auto relative overflow-hidden">
      {/* Casino felt texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-700/20 via-transparent to-green-700/20 animate-pulse"></div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-green-400 text-center mb-6 relative z-10">
        ♠️ BLACKJACK 21 ♠️
      </h2>

      {!gameStarted ? (
        <>
          {/* Bet Amount Selector */}
          <div className="mb-6 text-center relative z-10">
            <div className="text-white/70 text-sm mb-2">VALOR DA APOSTA:</div>
            <div className="flex justify-center items-center gap-2">
              <Button
                onClick={() => setBetAmount(Math.max(5, betAmount - 5))}
                disabled={betAmount <= 5}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm"
              >
                -5
              </Button>
              <div className="bg-black/50 px-4 py-2 rounded-lg border border-yellow-400/30">
                <span className="text-yellow-400 font-bold text-lg">{betAmount} 🪙</span>
              </div>
              <Button
                onClick={() => setBetAmount(betAmount + 5)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
              >
                +5
              </Button>
            </div>
          </div>
          <div className="text-center">
          <Button
            onClick={startGame}
            className="w-3/6 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white font-bold text-base md:text-xl py-3 md:py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 relative z-10 border-2 border-green-400"
          >
            🃏 INICIAR JOGO ({betAmount} moedas)
          </Button>
            </div>
        </>
      ) : (
        <>
          {/* Dealer Cards */}
          <div className="mb-6 relative z-10">
            <div className="text-white text-center mb-2">
              DEALER {dealerRevealed && `(${calculateHandValue(dealerCards)})`}
            </div>
            <div className="flex justify-center gap-2">
              {dealerCards.map((card, index) => (
                <CardComponent 
                  key={index} 
                  card={card} 
                  hidden={index === 1 && !dealerRevealed}
                />
              ))}
            </div>
          </div>

          {/* Player Cards */}
          <div className="mb-6 relative z-10">
            <div className="text-white text-center mb-2">
              VOCÊ ({calculateHandValue(playerCards)})
            </div>
            <div className="flex justify-center gap-2">
              {playerCards.map((card, index) => (
                <CardComponent key={index} card={card} />
              ))}
            </div>
          </div>

          {/* Game Actions */}
          {!gameEnded && calculateHandValue(playerCards) <= 21 && (
            <div className="flex gap-3 mb-4 relative z-10">
              <Button
                onClick={hit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg"
              >
                🃏 PEDIR CARTA
              </Button>
              <Button
                onClick={stand}
                className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 rounded-lg"
              >
                ✋ PARAR
              </Button>
            </div>
          )}

          {/* New Game Button */}
          {gameEnded && (
            <Button
              onClick={() => setGameStarted(false)}
              className="w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white font-bold text-base md:text-xl py-3 md:py-4 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 relative z-10 border-2 border-green-400"
            >
              🃏 NOVO JOGO
            </Button>
          )}
        </>
      )}

      {/* Rules */}
      <div className="mt-4 text-center text-xs md:text-sm text-white/60 relative z-10">
        🎯 Chegue o mais próximo de 21 sem estourar!
      </div>

      {/* Casino atmosphere */}
      <div className="absolute bottom-2 left-2 text-green-500/30 text-2xl animate-pulse">🃏</div>
      <div className="absolute top-2 right-2 text-green-500/30 text-2xl animate-pulse" style={{ animationDelay: '1s' }}>♠️</div>
      <div className="absolute bottom-2 right-2 text-green-500/30 text-2xl animate-pulse" style={{ animationDelay: '2s' }}>♣️</div>
    </div>
  );
};

export default Blackjack;
