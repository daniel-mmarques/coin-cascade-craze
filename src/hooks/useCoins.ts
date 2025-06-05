
import { useState, useEffect } from 'react';

export const useCoins = () => {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('casino-coins');
    return saved ? parseInt(saved) : 100;
  });

  useEffect(() => {
    localStorage.setItem('casino-coins', coins.toString());
  }, [coins]);

  const addCoins = (amount: number) => {
    setCoins(prev => prev + amount);
  };

  const spendCoins = (amount: number) => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      return true;
    }
    return false;
  };

  return { coins, addCoins, spendCoins };
};
