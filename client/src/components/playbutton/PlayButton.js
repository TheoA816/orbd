import React from 'react'
import styles from './PlayButton.module.css'

const PlayButton = ({ onClick, text }) => {

  return (
    <>
      {/* <div id="menu" className={styles.bg}></div> */}
      <button id="btn" className={styles.button} onClick={onClick}>{text}</button>
    </>
  )
}

export default PlayButton