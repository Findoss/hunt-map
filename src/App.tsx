import cn from 'classnames';
import { Sidebar } from './containers/sidebar';
import { Map } from './containers/map';
import styles from './app.module.css';
import { useEffect } from 'react';
import { fetchLangs } from 'store/lang/thunk';
import { useAppDispatch, useAppSelector } from 'hooks/redux-toolkit';
import { fetchMaps } from 'store/map/thunk';
import { selectViewMap } from 'store/map/selectors';
import { PlaceholderMap } from 'components/placeholder';

function App() {
  const dispatch = useAppDispatch();
  const { id: idMap } = useAppSelector(selectViewMap);

  useEffect(() => {
    dispatch(fetchLangs());
    dispatch(fetchMaps());
  }, []);

  return (
    <div className={cn(styles.app)}>
      <Sidebar />
      {idMap === '' ? <PlaceholderMap /> : <Map />}
    </div>
  );
}

export default App;
