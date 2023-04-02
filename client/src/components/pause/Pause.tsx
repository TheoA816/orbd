import { PointerLockControlsProps } from '@react-three/drei';
import PlayButton from '../playbutton/PlayButton'
import styles from './Pause.module.css';

type pauseProps = {
  plControls: React.MutableRefObject<PointerLockControlsProps>
}

const Pause = ({ plControls }: pauseProps) => {

  return (
    <div className={styles.container}>
      <PlayButton onClick={() => { if (plControls.current.lock) plControls.current.lock(); }} text={"Continue"} />
    </div>
  )
}

export default Pause