import LineChart from './charts/LineChart';
import small from './data/small.json';

function App() {
  return (
    <div className="container px-4">
      <header className="text-xl">Sparkline</header>
      <div className="text-gray-400 text-sm">Controls</div>

      <LineChart data={small} />
    </div>
  );
}

export default App;
