import { Sidebar } from './containers/sidebar';
import { Map } from './containers/map';

import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Map />
    </div>
  );
}

export default App;