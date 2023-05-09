import cn from 'classnames';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux-toolkit';

import { Sidebar } from './containers/sidebar';
import { Map } from './containers/map';

import { fetchLangs } from 'store/lang/thunk';
import { fetchMaps } from 'store/map/thunk';

import styles from './app.module.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLangs());
    dispatch(fetchMaps());
  }, []);

  return (
    <div className={cn(styles.app)}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default App;
