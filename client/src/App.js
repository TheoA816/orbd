import Game from "./components/Game";
import styles from "./App.module.css"

function App() {

  return (
    <div className={styles.canvas}>
      <Game />
    </div>
  );
}

export default App;
