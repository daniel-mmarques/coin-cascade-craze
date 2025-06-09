
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface WithdrawalProps {
  coins: number;
  onWithdraw: (amount: number) => boolean;
}

const Withdrawal = ({ coins, onWithdraw }: WithdrawalProps) => {
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [pixKey, setPixKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const coinValue = 0.20; // R$ 0,20 por moeda
  const minWithdrawCoins = 50; // Mínimo de 50 moedas para sacar
  const withdrawalValue = withdrawAmount * coinValue;

  const handleWithdraw = async () => {
    if (withdrawAmount < minWithdrawCoins) {
      toast({
        title: "Valor insuficiente!",
        description: `O saque mínimo é de ${minWithdrawCoins} moedas (R$ ${(minWithdrawCoins * coinValue).toFixed(2)}).`,
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
    
    // Simula processamento do saque
    setTimeout(() => {
      setIsProcessing(false);
      setPixKey('');
      
      toast({
        title: "Saque solicitado!",
        description: `Seu saque de R$ ${withdrawalValue.toFixed(2)} foi processado. O valor será transferido em até 24h.`,
        className: "bg-gradient-to-r from-emerald-600 to-green-700 text-white border-none",
      });
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-b from-slate-800 to-gray-900 rounded-2xl p-6 shadow-2xl border-2 border-emerald-400/30 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-emerald-400 text-center mb-6">💳 SAQUE</h2>
      
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
            onClick={() => setWithdrawAmount(Math.max(minWithdrawCoins, withdrawAmount - 10))}
            disabled={isProcessing || withdrawAmount <= minWithdrawCoins}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm"
          >
            -10
          </Button>
          <div className="bg-black/50 px-4 py-2 rounded-lg border border-emerald-400/30 min-w-[120px]">
            <div className="text-emerald-400 font-bold text-lg text-center">{withdrawAmount} 🪙</div>
          </div>
          <Button
            onClick={() => setWithdrawAmount(Math.min(coins, withdrawAmount + 10))}
            disabled={isProcessing || withdrawAmount >= coins}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
          >
            +10
          </Button>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-400">
            R$ {withdrawalValue.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400">
            Taxa de conversão: R$ {coinValue.toFixed(2)} por moeda
          </div>
        </div>
      </div>

      {/* Botões de Valor Rápido */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[50, 100, 250].map((amount) => (
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
          `💳 SACAR R$ ${withdrawalValue.toFixed(2)}`
        )}
      </Button>

      {/* Informações */}
      <div className="mt-6 p-3 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-lg border border-blue-400/30">
        <div className="text-center text-xs text-blue-200">
          <div className="font-bold mb-1">ℹ️ INFORMAÇÕES</div>
          <div>• Saque mínimo: {minWithdrawCoins} moedas (R$ {(minWithdrawCoins * coinValue).toFixed(2)})</div>
          <div>• Processamento em até 24 horas</div>
          <div>• Taxa de conversão: R$ {coinValue.toFixed(2)} por moeda</div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
