// components/Spinner.tsx

import { useState, useEffect } from 'react';
import WheelComponent from './Wheel';
import TipsModal from './TipsModal';

const sectors: string[] = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Energy',
  'Entertainment',
  'Agriculture',
  'Transportation',
  'Real Estate',
];

export default function Spinner() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Function to handle when the spin starts
  const handleSpinStart = () => {
    // Reset timer to 60 and stop it
    setTimeLeft(60);
    setTimerActive(false);
  };

  const handleSpinResult = async (sector: string) => {
    setSelectedSector(sector);
    setLoading(true);

    const response = await fetch('/api/generateName', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sector }),
    });

    const data = await response.json();
    setBusinessName(data.name);
    setLoading(false);
  };

  // Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }

    return () => clearTimeout(timer);
  }, [timerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(60);
    setTimerActive(true);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="text-center">
      <WheelComponent
        sectors={sectors}
        onSpinStart={handleSpinStart}
        onFinished={handleSpinResult}
      />
      {loading && <p className="mt-4 text-lg">Generating business name...</p>}
      {businessName && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Sector: {selectedSector}</h2>
          <p className="text-xl mt-2">Business Name: {businessName}</p>
          <p className="mt-4 text-gray-700">
            Now, craft your elevator pitch for this business!
          </p>
          {/* Buttons Section */}
          <div className="mt-4 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              onClick={startTimer}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Start Pitch Timer Now (60 seconds)
            </button>
            <button
              onClick={openModal}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Show Tips
            </button>
          </div>
          {/* Display the timer */}
          {timerActive && (
            <div className="mt-4 text-2xl font-bold">
              Time Left: {timeLeft} seconds
            </div>
          )}
          {!timerActive && timeLeft === 0 && (
            <div className="mt-4 text-2xl font-bold text-red-600">
              Time's up!
            </div>
          )}
        </div>
      )}
      {/* Include the TipsModal */}
      <TipsModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
