import PlayButton from '../playbutton/PlayButton';
import styles from './Menu.module.css';
import { PointerLockControls as PointerLockControlsImpl } from 'three-stdlib'

type menuProps = {
  plControls: React.MutableRefObject<PointerLockControlsImpl>
}

const Menu = ({ plControls }: menuProps) => {

  return (
    <div className={styles.container}>
      <span className={styles.text}>Pan around with your mouse</span>
      <PlayButton onClick={() => { if (plControls.current.lock) plControls.current.lock(); }} text={"Play"}/>
    </div>
  )
}

export default Menu