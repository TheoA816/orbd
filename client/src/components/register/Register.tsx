import styles from './Register.module.css';
import { motion } from "framer-motion";
import { Alert } from "@mui/material";
import axios from '../../config/axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthProvider';

const Register = () => {

  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmpassword: ""
  });

  const [success, setSuccess] = useState<null | boolean>(null);
  const [err, setErr] = useState('')
  const { setAccessToken } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputs.password.length < 8) {
      setErr("Password must at least be 8 characters long");
      setSuccess(false);
      return;
    }

    if (inputs.password !== inputs.confirmpassword) {
      setErr("Passwords do not match");
      setSuccess(false);
      return;
    }

    axios
      .post("/register", {
        email: inputs.email,
        username: inputs.username,
        password: inputs.password,
      })
      .then(res => {
        setSuccess(true);
        setInputs({ email: "", username: "", password: "", confirmpassword: "" });
        setAccessToken(res.data);
      })
      .catch(err => {
        setErr(err.response.data);
        setSuccess(false);
      })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <form onSubmit={handleSubmit} className={styles.container}>
          <div className={styles.box}>
            {/*ERROR*/}
            { success === false && <Alert severity="error">{err}</Alert> }
            {/*TITLE */}
            <h1 className={styles.title}>Register</h1>
            {/*EMAIL*/}
            <h3 className={styles.h3}>Email</h3>
            <input
              name="email"
              className={styles.input}
              type="text"
              value={inputs.email}
              onChange={handleChange}
              required
            />
            {/*EMAIL*/}
            <h3 className={styles.h3}>Username</h3>
            <input
              name="username"
              className={styles.input}
              type="text"
              value={inputs.username}
              onChange={handleChange}
              required
            />
            {/*PASSWORD*/}
            <h3 className={styles.h3}>Password</h3>
            <input
              name="password"
              className={styles.input}
              type="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {/*CONFIRM PASSWORD*/}
            <h3 className={styles.h3}>Confirm Password</h3>
            <input
              name="confirmpassword"
              className={styles.input}
              type="password"
              value={inputs.confirmpassword}
              onChange={handleChange}
            />
            {/*BUTTON*/}
            <motion.button className={styles.button}
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </motion.button>
          </div>
        </form>
      }
    </>
  )
}

export default Register