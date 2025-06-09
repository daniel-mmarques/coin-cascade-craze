
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface WithdrawalProps {
  coins: number;
  onWithdraw: (amount: number) => boolean;
}

const Withdrawal = ({ coins, onWithdraw }: WithdrawalProps) => {
  const [withdrawAmount, setWithdrawAmount] = useState(100);
  const [pixKey, setPixKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const coinValue = 0.18; // R$ 0,18 por moeda (reduzido para desincentivar saques)
  const minWithdrawCoins = 100; // Mínimo de 100 moedas para sacar
  const withdrawalFee = 0.15; // Taxa de saque de 15%
  const withdrawalValue = withdrawAmount * coinValue;
  const feeAmount = withdrawalValue * withdrawalFee;
  const finalAmount = withdrawalValue - feeAmount;

  // Calcula quantas rodadas grátis o usuário perderia
  const freeSpinsLost = Math.floor(withdrawAmount / 5); // 5 moedas por rodada

  const handleWithdraw = async () => {
    if (withdrawAmount < minWithdrawCoins) {
      toast({
        title: "Saque mínimo não atingido!",
        description: `O saque mínimo é de ${minWithdrawCoins} moedas (R$ ${(minWithdrawCoins * coinValue).toFixed(2)}). Continue jogando para atingir o mínimo!`,
        variant: "destructive",
      });
      return;
    }

    if (!pixKey.trim()) {
      toast({
        title: "Chave PIX obrigatória!",
        description: "Por favor, insira sua chave PIX para receber o pagamento.",
        variant: "destructive",
      });
      return;
    }

    if (!onWithdraw(withdrawAmount)) {
      toast({
        title: "Moedas insuficientes!",
        description: `Você precisa de pelo menos ${withdrawAmount} moedas para sacar.`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simula processamento do saque com delay maior
    setTimeout(() => {
      setIsProcessing(false);
      setPixKey('');
      
      toast({
        title: "Saque solicitado!",
        description: `Seu saque de R$ ${finalAmount.toFixed(2)} foi processado. O valor será transferido em até 72h.`,
        className: "bg-gradient-to-r from-emerald-600 to-green-700 text-white border-none",
      });
    }, 3000); // Delay maior para criar ansiedade
  };

  return (
    <div className="bg-gradient-to-b from-slate-800 to-gray-900 rounded-2xl p-6 shadow-2xl border-2 border-emerald-400/30 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-emerald-400 text-center mb-6">💳 SAQUE</h2>
      
      {/* Alerta psicológico */}
      {coins >= minWithdrawCoins && (
        <div className="mb-4 p-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border border-red-400/30">
          <div className="text-center text-sm text-orange-200">
            <div className="font-bold mb-1">⚠️ ATENÇÃO</div>
            <div>Você está prestes a perder {freeSpinsLost} rodadas grátis!</div>
            <div className="text-xs mt-1">Que tal tentar a sorte uma última vez? 🍀</div>
          </div>
        </div>
      )}

      {/* Saldo Atual */}
      <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600 mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-1">SALDO DISPONÍVEL</div>
          <div className="text-2xl font-bold text-emerald-400">
            🪙 {coins} moedas
          </div>
          <div className="text-lg text-gray-300">
            ≈ R$ {(coins * coinValue).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Valor do Saque */}
      <div className="mb-6">
        <div className="text-white/70 text-sm mb-2">QUANTIDADE DE MOEDAS PARA SACAR:</div>
        <div className="flex justify-center items-center gap-2 mb-3">
          <Button
            onClick={() => setWithdrawAmount(Math.max(minWithdrawCoins, withdrawAmount - 25))}
            disabled={isProcessing || withdrawAmount <= minWithdrawCoins}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm"
          >
            -25
          </Button>
          <div className="bg-black/50 px-4 py-2 rounded-lg border border-emerald-400/30 min-w-[120px]">
            <div className="text-emerald-400 font-bold text-lg text-center">{withdrawAmount} 🪙</div>
          </div>
          <Button
            onClick={() => setWithdrawAmount(Math.min(coins, withdrawAmount + 25))}
            disabled={isProcessing || withdrawAmount >= coins}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
          >
            +25
          </Button>
        </div>
        
        <div className="text-center mb-3">
          <div className="text-lg text-gray-300 line-through">
            R$ {withdrawalValue.toFixed(2)}
          </div>
          <div className="text-xs text-red-400 mb-1">
            - Taxa de saque: R$ {feeAmount.toFixed(2)} (15%)
          </div>
          <div className="text-2xl font-bold text-emerald-400">
            R$ {finalAmount.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400">
            Taxa de conversão: R$ {coinValue.toFixed(2)} por moeda
          </div>
        </div>
      </div>

      {/* Botões de Valor Rápido */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[100, 250, 500].map((amount) => (
          <Button
            key={amount}
            onClick={() => setWithdrawAmount(amount)}
            disabled={isProcessing || amount > coins}
            className={`text-sm py-2 ${
              withdrawAmount === amount
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {amount} 🪙
          </Button>
        ))}
      </div>

      {/* Chave PIX */}
      <div className="mb-6">
        <div className="text-white/70 text-sm mb-2">CHAVE PIX:</div>
        <Input
          type="text"
          placeholder="Digite sua chave PIX (CPF, e-mail, telefone ou chave aleatória)"
          value={pixKey}
          onChange={(e) => setPixKey(e.target.value)}
          disabled={isProcessing}
          className="bg-slate-700/50 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      {/* Mensagem desencorajadora para valores baixos */}
      {withdrawAmount >= minWithdrawCoins && withdrawAmount < 200 && (
        <div className="mb-4 p-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg border border-yellow-400/30">
          <div className="text-center text-sm text-yellow-200">
            <div className="font-bold mb-1">💡 DICA ESPECIAL</div>
            <div>Com apenas mais algumas rodadas você pode multiplicar este valor!</div>
            <div className="text-xs mt-1">Jackpots de até 1000x te aguardam! 🎰</div>
          </div>
        </div>
      )}

      {/* Botão de Saque */}
      <Button
        onClick={handleWithdraw}
        disabled={isProcessing || withdrawAmount < minWithdrawCoins || withdrawAmount > coins || !pixKey.trim()}
        className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold py-3 rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:scale-100"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            PROCESSANDO...
          </div>
        ) : (
          `💳 SACAR R$ ${finalAmount.toFixed(2)}`
        )}
      </Button>

      {/* Informações atualizadas */}
      <div className="mt-6 p-3 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-lg border border-blue-400/30">
        <div className="text-center text-xs text-blue-200">
          <div className="font-bold mb-1">ℹ️ INFORMAÇÕES</div>
          <div>• Saque mínimo: {minWithdrawCoins} moedas (R$ {(minWithdrawCoins * coinValue).toFixed(2)})</div>
          <div>• Taxa de saque: 15% sobre o valor</div>
          <div>• Processamento em até 72 horas</div>
          <div>• Taxa de conversão: R$ {coinValue.toFixed(2)} por moeda</div>
        </div>
      </div>

      {/* Incentivo a continuar jogando */}
      <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/30">
        <div className="text-center text-sm text-purple-200">
          <div className="font-bold mb-1">🎯 CONTINUE JOGANDO</div>
          <div>Próximo jackpot em: 🎰 {Math.floor(Math.random() * 50) + 10} rodadas!</div>
          <div className="text-xs mt-1">Multiplique suas moedas antes de sacar! 🚀</div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
