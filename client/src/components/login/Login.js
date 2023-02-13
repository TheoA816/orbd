import styles from './Login.module.css';
import { motion } from "framer-motion";
import { Alert } from "@mui/material";
import { axiosCustom } from '../../config/axios';
import { useState } from 'react';

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(true);
  const [err, setErr] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    axiosCustom
      .post("/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .then(res => setInputs({ email: "", password: "" }))
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
    // CONTAINER
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.box}>
        {/*ERROR*/}
        { !success && <Alert severity="error">{err}</Alert> }
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
          Or <a href={"/register"}>Create Your Account</a> now to build your own
          personalised calendar!
        </p>
      </div>
    </form>
  )
}

export default Login