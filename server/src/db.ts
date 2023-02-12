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

// QUERIES
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

const registerUser = async (username: string, email: string, password: string, salt: string, refreshToken: string) => {
  const id = await pool.
    query(`
      INSERT INTO Users (username, email, password, salt, refreshToken) 
      VALUES ($1, $2, $3, $4, $5) RETURNING id`, 
    [username, email, password, salt, refreshToken])
    .then((res) => { return res.rows[0].id })
    .catch(err => console.log(err))

  await pool.
  query(`INSERT INTO Stats (id, best_time, plays) VALUES ($1, $2, $3)`, [id, null, 0])
  .then(res => console.log(res))
  .catch(err => console.log(err))
}

const updateToken = async (refreshToken: string, email: string) => {
  await pool.
    query(`UPDATE Users SET refreshToken = $1 WHERE email = $2`, [refreshToken, email])
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

const updateStats = (email: string, best_time: number) => {
  pool.
    query(`
      UPDATE S
        SET S.plays = S.plays + 1,
        S.best_time = $2
      FROM Stats S JOIN Users U
        ON S.id = U.id
      WHERE U.email = $1`,
    [email, best_time])
    .then(res => console.log(res))
    .catch(err => console.log(err))
}