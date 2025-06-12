
import { RouletteNumber } from './types';

interface RouletteWheelProps {
  numbers: RouletteNumber[];
  wheelRotation: number;
  ballRotation: number;
  getNumberColor: (num: number) => 'red' | 'black' | 'green';
}

const RouletteWheel = ({ numbers, wheelRotation, ballRotation, getNumberColor }: RouletteWheelProps) => {
  return (
    <div className="relative w-48 h-48 md:w-72 md:h-72">
      {/* Outer rim */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-800 shadow-2xl"></div>
      
      {/* Wheel with numbers */}
      <div 
        className="absolute inset-2 rounded-full relative overflow-hidden transition-transform duration-4000 ease-out shadow-inner"
        style={{ transform: `rotate(${wheelRotation}deg)` }}
      >
        {/* Number segments */}
        {numbers.map((num, index) => {
          const angle = (index * 360) / 37;
          const color = getNumberColor(num);
          return (
            <div
              key={num}
              className="absolute w-full h-full"
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'center center'
              }}
            >
              <div 
                className={`absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-8 md:w-8 md:h-10 flex items-center justify-center text-xs md:text-sm font-bold text-white rounded border border-yellow-300 shadow-lg ${
                  color === 'red' ? 'bg-gradient-to-b from-red-600 to-red-800 border-red-400' : 
                  color === 'black' ? 'bg-gradient-to-b from-gray-900 to-black border-gray-600' : 
                  'bg-gradient-to-b from-green-600 to-green-800 border-green-400'
                }`}
              >
                {num}
              </div>
              {/* Separator lines */}
              <div className="absolute top-0 left-1/2 w-px h-16 bg-gradient-to-b from-yellow-400 to-transparent transform -translate-x-1/2"></div>
            </div>
          );
        })}
        
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full border-4 border-yellow-800 shadow-lg flex items-center justify-center">
          <div className="w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full"></div>
        </div>
      </div>
      
      {/* Ball */}
      <div 
        className="absolute inset-0 transition-transform duration-4000 ease-out"
        style={{ transform: `rotate(${ballRotation}deg)` }}
      >
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-white via-gray-100 to-gray-300 rounded-full shadow-xl border border-gray-400 z-20"></div>
      </div>
      
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500 z-30 drop-shadow-lg"></div>
    </div>
  );
};

export default RouletteWheel;
