import { useAtomValue } from 'jotai';
import LineChart from './charts/LineChart';
import { chartAtom } from './state/appAtom';
import Notes from './components/Notes';


function App() {
  const charts = useAtomValue(chartAtom)
  return (
    <div className="container px-4">
      <header className="text-xl">Charts</header>

      <div className="text-gray-400 text-sm">Controls</div>
      {
        charts.map(c => (
          <div key={c.name}>
            <div className="text">{c.name}</div>
            <LineChart data={c.data} />
          </div>
        ))
      }

      <Notes />
    </div>

  );
}

export default App;
