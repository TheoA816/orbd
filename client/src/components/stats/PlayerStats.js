import styles from './PlayerStats.module.css';
import { axiosCustom } from '../../config/axios';
import { FaUserAlt } from 'react-icons/fa';
import { useState } from 'react';

const PlayerStats = () => {

  const [loggedIn, setLoggedIn] = useState(
    axiosCustom
      .post('/prelogin')
      .then(res => {
        console.log(res);
        return res;
      })
  );

  return (
    <div className={styles.container}>
      <FaUserAlt/>
    </div>
  )
}

export default PlayerStats