import styles from './Register.module.css';
import { motion } from "framer-motion";
import { Alert } from "@mui/material";
import { axiosCustom } from '../../config/axios';
import { useState } from 'react';

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmpassword: ""
  });

  const [success, setSuccess] = useState(true);
  const [err, setErr] = useState('')

  const handleSubmit = async (e) => {
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

    axiosCustom
      .post("/register", {
        email: inputs.email,
        username: inputs.username,
        password: inputs.password,
      })
      .then(res => setInputs({ email: "", username: "", password: "", confirmpassword: "" }))
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
        <h1 className={styles.title}>Register</h1>
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
        {/*EMAIL*/}
        <h3>Username</h3>
        <input
          name="username"
          className={styles.input}
          type="text"
          value={inputs.username}
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
          onChange={handleChange}
        />
        {/*CONFIRM PASSWORD*/}
        <h3>Confirm Password</h3>
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
        {/*TEXT AT BOTTOM*/}
        <p>
          Or <a href={"/register"}>Create Your Account</a> now to build your own
          personalised calendar!
        </p>
      </div>
    </form>
  )
}

export default Register