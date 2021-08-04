import { useEffect } from 'react';

import { Sidebar } from './containers/sidebar';
import { Map } from './containers/map';
import { Banner } from './components/banner';

import { getUrlData } from './utils/URL';

import './App.css';

function App() {
  useEffect(() => {
    console.log(getUrlData());
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <Map />
      <Banner />
    </div>
  );
}

export default App;
