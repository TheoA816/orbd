import styles from './Instructions.module.css';

const Instructions = () => {
  console.log("HERE")
  return (
    <div className={styles.container}>
      <span>Move WASD</span>
      <span>Catch the orbs</span>
      <span>Exit through the portal</span>
      <span>Stay within the cage</span>
    </div>
  )
}

export default Instructions