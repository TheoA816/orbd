import styles from "./Stats.module.css";
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { motion } from "framer-motion";

const Stats = () => {

  const onClick = () => {
    console.log(document.cookie);
  }

  return (
    <>
      <Link to={`/`}><FaHome className={styles.icon}/></Link>
      <div className={styles.container}>
        <span className={styles.username}>Username</span>
        <div className={styles.stats}>
          <span>Total Plays</span>
          <span className={styles.value}>0</span>
        </div>
        <div className={styles.stats}>
          <span>Best Time</span>
          <span className={styles.value}>bruh</span>
        </div>
        <motion.button className={styles.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
        >
          Sign out
        </motion.button>
      </div>
    </>
  )
}

export default Stats