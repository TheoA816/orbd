import * as dotenv from 'dotenv';
import { User } from '../interfaces';
import { Pool } from 'pg';

dotenv.config()

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  database: process.env.DBNAME
});

export {
  getUserByEmail,
  getUserByUsername,
  getUserByToken,
  registerUser,
  updateToken
}

const getUserByEmail = (email: string): Promise<null | User> => {
  const res = pool
    .query(`SELECT * FROM Users WHERE email ~* ('^' || $1 || '$')`, [email])
    .then((res) => {
      // should only return one result if exists
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0];
    })
    .catch((err) => {return { error: err }})
  return res;
}

const getUserByUsername = (username: string): Promise<null | User> => {
  const res = pool
    .query(`SELECT * FROM Users WHERE username ~* ('^' || $1 || '$')`, [username])
    .then((res) => {
      // should only return one result if exists
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0];
    })
    .catch((err) => {return { error: err }})
  return res;
}

const getUserByToken = (token: string): Promise<null | User> => {
  const res = pool
    .query(`SELECT * FROM Users WHERE refreshToken ~* ('^' || $1 || '$')`, [token])
    .then((res) => {
      // should only return one result if exists
      if (res.rows.length !== 1) {
        return null;
      }
      return res.rows[0];
    })
    .catch((err) => {return { error: err }})
  return res;
}

/**
 * 
 * @param username 
 * @param email 
 * @param password
 * assumes a valid username / email / password will be supplied
 */

const registerUser = (username: string, email: string, password: string, salt: string, refreshToken: string) => {
  return pool.
    query(`INSERT INTO Users (username, email, password, salt, refreshToken) VALUES ($1, $2, $3, $4, $5)`, [username, email, password, salt, refreshToken])
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

const updateToken = (refreshToken: string, email: string) => {
  return pool.
    query(`UPDATE Users SET refreshToken = $1 WHERE email = $2`, [refreshToken, email])
    .then(res => console.log(res))
    .catch(err => console.log(err))
}