import React from 'react'
import styles from './PlayButton.module.css'

type playProps = {
  onClick: () => void,
  text: string
}

const PlayButton = ({ onClick, text }: playProps) => {

  return (
    <button id="btn" className={styles.button} onClick={onClick}>{text}</button>
  )
}

export default PlayButton