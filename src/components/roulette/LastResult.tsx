
import { RouletteNumber, NumberColor } from './types';

interface LastResultProps {
  lastResult: RouletteNumber | null;
  getNumberColor: (num: number) => NumberColor;
}

const LastResult = ({ lastResult, getNumberColor }: LastResultProps) => {
  if (lastResult === null) return null;

  return (
    <div className="text-center mb-6">
      <div className="text-white/70 text-sm mb-2">ÚLTIMO RESULTADO:</div>
      <div className={`inline-block px-6 py-3 rounded-full text-white font-bold text-xl md:text-2xl shadow-lg border-2 ${
        getNumberColor(lastResult) === 'red' ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-400' :
        getNumberColor(lastResult) === 'black' ? 'bg-gradient-to-br from-gray-800 to-black border-gray-400' : 
        'bg-gradient-to-br from-green-500 to-green-700 border-green-400'
      }`}>
        {lastResult}
      </div>
    </div>
  );
};

export default LastResult;
