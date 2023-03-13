import styles from "./Stats.module.css";
import { Link, useLoaderData } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { motion } from "framer-motion";
import useAxiosPrivate from "../../config/useAxiosPrivate";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Stats = () => {

  const stats = useLoaderData();
  const axiosPrivate = useAxiosPrivate();
  const { setAccessToken } = useContext(AuthContext);

  const onClick = async () => {
    await axiosPrivate.post('/user/signout');
    setAccessToken('');
  }

  return (
    <>
      <Link to={`/`}><FaHome className={styles.icon}/></Link>

      <div className={styles.container}>

        <span className={styles.username}>{stats.username}</span>

        <div className={styles.stats}>
          <span>Total Plays</span>
          <span className={styles.value}>{stats.plays}</span>
        </div>

        <div className={styles.stats}>
          <span>Best Time</span>
          <span className={styles.value}>{stats.best_time}</span>
        </div>
        
        <Link className={styles.buttonWrapper} to={`/`}>
          <motion.button className={styles.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
          >
            Sign out
          </motion.button>
        </Link>
      </div>
    </>
  )
}

export default Stats