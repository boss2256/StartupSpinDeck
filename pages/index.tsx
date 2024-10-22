import Spinner from '../components/Spinner';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Startup Elevator Pitch Spin Wheel
        </h1>
        <Spinner />
      </div>
    </div>
  );
}
