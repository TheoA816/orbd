import styles from './Player.module.css';
import { axiosCustom } from '../../config/axios';
import { FaUserAlt } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import Login from '../login/Login';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

const Player = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const { setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    const setLogin = async () => {
      console.log("HELLON PRELOGIN?")
      const res = await axiosCustom.post("/prelogin");
      console.log("PRELOGIN");
      if (res.status === 200) {
        setLoggedIn(true);
        setAccessToken(res.data);
      } else { 
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