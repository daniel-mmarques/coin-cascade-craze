
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

interface CoinShopProps {
  onPurchase: (amount: number) => void;
}

const CoinShop = ({ onPurchase }: CoinShopProps) => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos de oferta especial
  const [showUrgency, setShowUrgency] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimeLeft(300); // Reinicia o timer
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const packages = [
    { 
      coins: 25, 
      price: 'R$ 5,00', 
      bonus: 5, 
      pricePerCoin: 0.20,
      popular: false 
    },
    { 
      coins: 50, 
      price: 'R$ 10,00', 
      bonus: 15, 
      pricePerCoin: 0.20,
      popular: false 
    },
    { 
      coins: 100, 
      price: 'R$ 20,00', 
      bonus: 35, 
      pricePerCoin: 0.20,
      popular: true 
    },
    { 
      coins: 250, 
      price: 'R$ 50,00', 
      bonus: 100, 
      pricePerCoin: 0.20,
      popular: false 
    },
    { 
      coins: 500, 
      price: 'R$ 100,00', 
      bonus: 250, 
      pricePerCoin: 0.20,
      popular: false,
      vip: true 
    },
  ];

  const handlePurchase = (coins: number, bonus: number) => {
    const totalCoins = coins + bonus;
    onPurchase(totalCoins);
    
    toast({
      title: "🎉 Compra realizada com sucesso!",
      description: `Você recebeu ${totalCoins} moedas${bonus > 0 ? ` (incluindo ${bonus} de bônus!)` : '!'} Boa sorte nos jogos!`,
      className: "bg-gradient-to-r from-emerald-600 to-green-700 text-white border-none",
    });
  };

  return (
    <div className="bg-gradient-to-b from-slate-800 to-gray-900 rounded-2xl p-6 shadow-2xl border-2 border-amber-400/30 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-amber-400 text-center mb-6">🛒 LOJA DE MOEDAS</h2>
      
      {/* Oferta por tempo limitado */}
      {showUrgency && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-xl border-2 border-red-400/50 animate-pulse">
          <div className="text-center">
            <div className="text-lg font-bold text-red-300 mb-1">🔥 OFERTA ESPECIAL</div>
            <div className="text-2xl font-bold text-white mb-1">{formatTime(timeLeft)}</div>
            <div className="text-sm text-red-200">Bônus DOBRADO em todos os pacotes!</div>
            <div className="text-xs text-gray-300 mt-1">Aproveite antes que acabe! ⏰</div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {packages.map((pkg, index) => (
          <div 
            key={index} 
            className={`relative bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border transition-all duration-200 hover:scale-105 ${
              pkg.popular ? 'border-amber-400 shadow-lg shadow-amber-400/20' : 
              pkg.vip ? 'border-purple-400 shadow-lg shadow-purple-400/20' : 
              'border-gray-600'
            }`}
          >
            {/* Badge para pacote popular */}
            {pkg.popular && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                🔥 MAIS POPULAR
              </div>
            )}
            
            {/* Badge para pacote VIP */}
            {pkg.vip && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                👑 VIP PREMIUM
              </div>
            )}

            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="text-xl font-bold text-amber-400">
                  🪙 {pkg.coins} moedas
                </div>
                {pkg.bonus > 0 && (
                  <div className="text-sm text-emerald-400 font-medium">
                    + {showUrgency ? pkg.bonus * 2 : pkg.bonus} bônus! 🎁
                  </div>
                )}
                <div className="text-xs text-gray-400">
                  Apenas R$ {pkg.pricePerCoin.toFixed(2)} por moeda
                </div>
                {pkg.vip && (
                  <div className="text-xs text-purple-300 font-medium">
                    🌟 Acesso VIP incluído!
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white">
                  {pkg.price}
                </div>
                {pkg.bonus > 0 && (
                  <div className="text-xs text-emerald-400">
                    Total: {pkg.coins + (showUrgency ? pkg.bonus * 2 : pkg.bonus)}
                  </div>
                )}
                <div className="text-xs text-gray-400">
                  {((parseFloat(pkg.price.replace('R$ ', '').replace(',', '.')) / (pkg.coins + (showUrgency ? pkg.bonus * 2 : pkg.bonus))) * 100).toFixed(0)}% economia!
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => handlePurchase(pkg.coins, showUrgency ? pkg.bonus * 2 : pkg.bonus)}
              className={`w-full font-bold py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                pkg.popular ? 'bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 text-black' :
                pkg.vip ? 'bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-700 hover:to-pink-800 text-white' :
                'bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white'
              }`}
            >
              💳 COMPRAR AGORA
            </Button>
          </div>
        ))}
      </div>

      {/* Benefícios da compra */}
      <div className="mt-6 p-3 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-lg border border-emerald-400/30">
        <div className="text-center text-sm text-emerald-200">
          <div className="font-bold mb-1">💰 VANTAGENS EXCLUSIVAS</div>
          <div className="text-xs space-y-1">
            <div>✅ Bônus instantâneo em moedas</div>
            <div>✅ Sem taxas ocultas</div>
            <div>✅ Pagamento seguro e rápido</div>
            <div>✅ Suporte 24/7</div>
          </div>
        </div>
      </div>

      {/* Urgência psicológica */}
      <div className="mt-4 p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-400/30">
        <div className="text-center text-sm text-orange-200">
          <div className="font-bold">⚡ ÚLTIMAS {Math.floor(Math.random() * 10) + 5} COMPRAS</div>
          <div className="text-xs">Outros jogadores estão comprando agora!</div>
        </div>
      </div>
    </div>
  );
};

export default CoinShop;
