import cn from 'classnames';
import { Sidebar } from './containers/sidebar';
import { Map } from './containers/map';
import styles from './app.module.css';
import { useEffect } from 'react';
import { fetchLangs } from 'store/lang/thunk';
import { useAppDispatch } from 'hooks/redux-toolkit';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLangs());
  }, []);

  return (
    <div className={cn(styles.app)}>
      <Sidebar />
      {/* <Map /> */}
    </div>
  );
}

export default App;
