import styles from './Player.module.css';
import axios from '../../config/axios';
import { FaUserAlt } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Player = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const setLogin = async () => {
      try {
        const res = await axios.post("/prelogin");
        setLoggedIn(true);
        console.log("PLAYER ACCESS TOKEN " + accessToken);
        setAccessToken(res.data);
      } catch {
        setLoggedIn(false);
      }
    }
    setLogin();
  }, [])

  return (
    <>
      {!loggedIn ?  
        <Link to={`login`} >
          <FaUserAlt className={styles.icon}/>
        </Link>
      :
      <Link to={`stats`} >
        <FaUserAlt className={styles.icon}/>
      </Link>
      }
    </>
  )
}

export default Player