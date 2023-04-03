import { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib'
import PlayButton from '../playbutton/PlayButton'
import styles from './Pause.module.css';

type pauseProps = {
  plControls: React.MutableRefObject<PointerLockControlsImpl>
}

const Pause = ({ plControls }: pauseProps) => {

  return (
    <div className={styles.container}>
      <PlayButton onClick={() => { if (plControls.current.lock) plControls.current.lock(); }} text={"Continue"} />
    </div>
  )
}

export default Pause