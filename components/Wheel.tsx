// components/Wheel.tsx

import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import dynamic from 'next/dynamic';

const DynamicWheel = dynamic(
  () => import('react-custom-roulette').then((mod) => mod.Wheel),
  { ssr: false }
);

interface WheelComponentProps {
  sectors: string[];
  onSpinStart: () => void;
  onFinished: (sector: string) => void;
}

export default function WheelComponent({
  sectors,
  onSpinStart,
  onFinished,
}: WheelComponentProps) {
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);

  const data = sectors.map((sector) => ({ option: sector }));

  const handleSpinClick = () => {
    // Reset and stop the timer
    onSpinStart();

    const newPrizeNumber = Math.floor(Math.random() * sectors.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className="flex flex-col items-center">
      <DynamicWheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={['#FF6B6B', '#5F27CD']}
        textColors={['#FFFFFF']}
        outerBorderColor="#000"
        outerBorderWidth={5}
        innerRadius={10}
        radiusLineColor="#000"
        radiusLineWidth={2}
        spinDuration={0.5}
        onStopSpinning={() => {
          setMustSpin(false);
          onFinished(data[prizeNumber].option);
        }}
      />
      <button
        onClick={handleSpinClick}
        className="mt-8 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Spin the Wheel
      </button>
    </div>
  );
}
