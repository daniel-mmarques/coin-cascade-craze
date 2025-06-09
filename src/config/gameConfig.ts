
// 🎯 CONFIGURAÇÃO GLOBAL DE CHANCE DE VITÓRIA DO CASSINO
export const CASINO_CONFIG = {
  // Ajuste este valor para controlar a chance de vitória em todos os jogos
  // 0.15 = 15% de chance de vitória
  WIN_CHANCE: 0.15,
};

// Função para verificar se o jogador deve ganhar
export const shouldPlayerWin = (): boolean => {
  return Math.random() < CASINO_CONFIG.WIN_CHANCE;
};
