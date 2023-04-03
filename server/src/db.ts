import * as dotenv from 'dotenv';
import { Stats, User } from '../interfaces';
import { Pool } from 'pg';

dotenv.config()

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: parseInt(process.env.PORT),
  database: process.env.DBNAME,
  ssl: true
});

export {
  getUserByEmail,
  getUserByUsername,
  getUserByToken,
  registerUser,
  updateToken,
  getStats,
  updateStats
}

// QUERIES

////////////////////////////////////// GETTERS /////////////////////////////////
const getUserByEmail = (email: string): Promise<null | User> => {
  const res = pool
    .query(`SELECT * FROM Users WHERE email ~* ('^' || $1 || '$')`, [email])
    .then((res) => {
      // should only return one result if exists
      console.log(res.rows);
      console.log(res.rows.length);
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
        console.log(res.rows)
        return null;
      }
      return res.rows[0];
    })
    .catch((err) => {return { error: err }})
  return res;
}


////////////////////////////////////// AUTH/// /////////////////////////////////
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
  .then(res => "\nREGISTERED\n")
  .catch(err => console.log(err))
}

const updateToken = async (refreshToken: string, email: string) => {
  await pool.
    query(`UPDATE Users SET refreshToken = $1 WHERE email = $2`, [refreshToken, email])
    .then(res => console.log("\nLOGGED IN\n"))
    .catch(err => console.log(err))
}


////////////////////////////////////// STATS ///////////////////////////////////
const getStats = (id: number): Promise<Stats> => {
  const res = pool.
    query(`
      SELECT U.username, S.best_time, S.plays
      FROM Stats S join Users U
        ON S.id = U.id
      WHERE U.id = $1`, [id])
    .then(res => { return res.rows[0] })
    .catch(err => console.log(err))
  return res;
}

const updateStats = async (id: number, best_time: number, plays: number) => {
  await pool.
    query(`
      UPDATE Stats
      SET 
        plays = $3,
        best_time = CASE WHEN ($2 < best_time) OR (best_time IS NULL) 
                      THEN $2
                      ELSE best_time
                    END
      WHERE id = $1`,
    [id, best_time, plays])
    .then(res => console.log("\nUPDATES STATS\n"))
    .catch(err => console.log(err))
}