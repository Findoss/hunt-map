import cn from 'classnames';
import { Sidebar } from './containers/sidebar';
import { Map } from './containers/map';
import styles from'./app.module.css';

function App() {
  return (
    <div className={cn(styles.app)}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default App;
