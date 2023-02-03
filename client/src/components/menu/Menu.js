import PlayButton from '../playbutton/PlayButton';
import styles from './Menu.module.css';

const Menu = ({ plControls }) => {

  return (
    <div className={styles.container}>
      <span className={styles.text}>Pan around with your mouse</span>
      <PlayButton onClick={() => plControls.current.lock()} text={"Play"}/>
    </div>
  )
}

export default Menu