import express from 'express';
import { getUserByEmail, getUserByToken } from './db';
import { register, login } from './auth';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = 3001;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.get('/getUser', async (req, res, next) => {
  try {
    const email = req.query.email as string;
    const user = await getUserByEmail(email);
    res.json(user);
  } catch (err) {
    next(err);
  }
})

app.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const token = await register(username, email, password);
    if (token.error) {
      res.status(400).json(token.error);
      return;
    }
    res.cookie('jwt', token.refreshToken, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(token);
  } catch (err) {
    next(err);
  }
})

app.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await login(email, password);
    if (token.error) {
      res.status(400).json(token.error);
      return;
    }
    res.cookie('jwt', token.refreshToken, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(token);
  } catch (err) {
    next(err);
  }
})

app.post('/prelogin', async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token === undefined) {
      res.status(401).json({ error: "token has expired" });
      return;
    }
    const user = await getUserByToken(token);
    if (user === null) {
      res.status(403).json({ error: "more than one user found - forbidden" });
      return;
    }
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
          if (err || user.email !== decoded.email) {
            res.status(403).json({ error: "user details altered - forbidden" });
            return;
          }
          res.cookie('jwt', token.refreshToken, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true });
          res.json(token);
      }
  )
  } catch (err) {
    next(err);
  }

})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})