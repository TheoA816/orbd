import styles from './Player.module.css';
import { axiosCustom } from '../../config/axios';
import { FaUserAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Login from '../login/Login';
import { Link } from 'react-router-dom';

const Player = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [stats, showStats] = useState(false);

  useEffect(() => {
    const setLogin = async () => {
      const res = await axiosCustom.post("/prelogin");
      (res.status === 200) ? setLoggedIn(true) : setLoggedIn(false);
    }
    setLogin();
    showStats(false);
  }, [])

  return (
    <>
      {!loggedIn ?  
        <Link to={`login`} >
          <FaUserAlt className={styles.icon}/>
        </Link>
      :
        <FaUserAlt className={styles.icon}/>
      }
    </>
  )
}

export default Player