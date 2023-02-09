import * as dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config()

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DBNAME
});