
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CoinShopProps {
  onPurchase: (amount: number) => void;
}

const CoinShop = ({ onPurchase }: CoinShopProps) => {
  const { toast } = useToast();

  const packages = [
    { coins: 25, price: 'R$ 5,00', bonus: 0, pricePerCoin: 0.20 },
    { coins: 50, price: 'R$ 10,00', bonus: 10, pricePerCoin: 0.20 },
    { coins: 100, price: 'R$ 20,00', bonus: 25, pricePerCoin: 0.20 },
    { coins: 250, price: 'R$ 50,00', bonus: 75, pricePerCoin: 0.20 },
    { coins: 500, price: 'R$ 100,00', bonus: 200, pricePerCoin: 0.20 },
  ];

  const handlePurchase = (coins: number, bonus: number) => {
    const totalCoins = coins + bonus;
    onPurchase(totalCoins);
    
    toast({
      title: "Compra realizada!",
      description: `Você recebeu ${totalCoins} moedas${bonus > 0 ? ` (incluindo ${bonus} de bônus!)` : '!'}`,
      className: "bg-gradient-to-r from-emerald-600 to-green-700 text-white border-none",
    });
  };

  return (
    <div className="bg-gradient-to-b from-slate-800 to-gray-900 rounded-2xl p-6 shadow-2xl border-2 border-amber-400/30 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-amber-400 text-center mb-6">🛒 LOJA DE MOEDAS</h2>
      
      <div className="space-y-4">
        {packages.map((pkg, index) => (
          <div key={index} className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="text-xl font-bold text-amber-400">
                  🪙 {pkg.coins} moedas
                </div>
                {pkg.bonus > 0 && (
                  <div className="text-sm text-emerald-400 font-medium">
                    + {pkg.bonus} bônus! 🎁
                  </div>
                )}
                <div className="text-xs text-gray-400">
                  R$ {pkg.pricePerCoin.toFixed(2)} por moeda
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-white">
                  {pkg.price}
                </div>
                {pkg.bonus > 0 && (
                  <div className="text-xs text-emerald-400">
                    Total: {pkg.coins + pkg.bonus}
                  </div>
                )}
              </div>
            </div>
            
            <Button
              onClick={() => handlePurchase(pkg.coins, pkg.bonus)}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold py-2 rounded-lg transition-all duration-200 hover:scale-105"
            >
              💳 COMPRAR
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        💡 Pacotes maiores incluem moedas bônus!
      </div>
      
      <div className="mt-4 p-3 bg-gradient-to-r from-amber-400/20 to-yellow-500/20 rounded-lg border border-amber-400/30">
        <div className="text-center text-sm text-amber-200">
          <div className="font-bold">💰 MELHOR VALOR</div>
          <div>Apenas R$ 0,20 por moeda + bônus extras!</div>
        </div>
      </div>
    </div>
  );
};

export default CoinShop;
