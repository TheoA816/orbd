import Game from "./components/Game";
import PlayerStats from "./components/stats/PlayerStats";
import styles from "./App.module.css"
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {

  return (
    <div className={styles.canvas}>
      {/* <Game /> */}
      {/* <PlayerStats /> */}
      <Register/>
    </div>
  );
}

export default App;
