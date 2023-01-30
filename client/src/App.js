import Game from "./components/Game";
import styles from "./App.module.css"
import PlayButton from "./components/playbutton/PlayButton";
import { useRef, useState } from "react";

function App() {

  const plControls = useRef();
  const [menu, setMenu] = useState(true);

  const onClick = () => {
    plControls.current.lock();
  }

  return (
    <div className={styles.canvas}>
      <Game plControls={plControls} menu={menu} setMenu={setMenu}/>
      {menu && <PlayButton onClick={onClick} text={"Play"}/>}
    </div>
  );
}

export default App;
