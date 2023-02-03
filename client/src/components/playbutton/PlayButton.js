import React from 'react'
import styles from './PlayButton.module.css'

const PlayButton = ({ onClick, text }) => {

  return (
    <button id="btn" className={styles.button} onClick={onClick}>{text}</button>
  )
}

export default PlayButton