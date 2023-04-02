import PlayButton from '../playbutton/PlayButton';
import styles from './Menu.module.css';
import { PointerLockControls, PointerLockControlsProps } from '@react-three/drei';

type menuProps = {
  plControls: React.MutableRefObject<PointerLockControlsProps>
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