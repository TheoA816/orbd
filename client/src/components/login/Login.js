import styles from './Login.module.css';
import { motion } from "framer-motion";
import { Alert } from "@mui/material";
import { axiosCustom } from '../../config/axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthProvider';

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(null);
  const [err, setErr] = useState('')
  const { setAccessToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axiosCustom
      .post("/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .then(res => {
        setSuccess(true);
        setInputs({ email: "", password: "" });
        setAccessToken(res.data);
      })
      .catch(err => {
        setErr(err.response.data);
        setSuccess(false);
      })
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
    
  return (
    <>
      <Link to={`/`}><FaHome className={styles.icon}/></Link>
      {success ? 
        <Navigate to={`/`}/>
      : 
        // CONTAINER
        <form onSubmit={handleSubmit} className={styles.box}>
          {/* ERROR */}
          { success === false && <Alert severity="error">{err}</Alert> }
          {/*TITLE */}
          <h1 className={styles.title}>Login</h1>
          {/*EMAIL*/}
          <h3>Email</h3>
          <input
            name="email"
            className={styles.input}
            type="text"
            value={inputs.email}
            onChange={handleChange}
            required
          />
          {/*PASSWORD*/}
          <h3>Password</h3>
          <input
            name="password"
            className={styles.input}
            type="password"
            value={inputs.password}
            id="password"
            onChange={handleChange}
          />
          {/*BUTTON*/}
          <motion.button className={styles.button}
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          {/*TEXT AT BOTTOM*/}
          <p>
            Or <Link to={`../register`}>register</Link> now to save your scores!
          </p>
        </form>
      }
    </>
  )
}

export default Login