import cn from 'classnames';
import { Sidebar } from './containers/sidebar';
import { Map } from './containers/map';
import styles from'./app.module.css';

function App() {
  const styleApp = cn(`${styles.app}`)
  return (
    <div className={styleApp}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default App;
