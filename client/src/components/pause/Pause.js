import PlayButton from '../playbutton/PlayButton'
import styles from './Pause.module.css';

const Pause = ({ plControls }) => {

  return (
    <div className={styles.container}>
      <PlayButton onClick={() => plControls.current.lock()} text={"Continue"} />
    </div>
  )
}

export default Pause