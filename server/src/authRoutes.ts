import express from 'express';
import jwt from 'jsonwebtoken';
import { getUserByToken } from './db';
import { register, login } from './authHelper';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {

    const { username, email, password } = req.body;
    const token = await register(username, email, password);

    if (token.error) {
      res.status(400).json(token.error);
      return;
    }

    res.cookie('jwt', token.refreshToken, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' });
    res.json(token.accessToken);
  } catch (err) {
    next(err);
  }
})

router.post('/login', async (req, res, next) => {
  try {

    const { email, password } = req.body;
    const token = await login(email, password);
    
    if (token.error) {
      res.status(400).json(token.error);
      return;
    }

    res.cookie('jwt', token.refreshToken, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' });
    res.json(token.accessToken);
  } catch (err) {
    next(err);
  }
})

// If refresh token (expiry 3 days) still exists, no need for login
router.post('/prelogin', async (req, res, next) => {
  try {

    const token = req.cookies.jwt;
    console.log(token);
    if (token === undefined) {
      res.status(401).json({ error: "token has expired" });
      return;
    }
    
    const user = await getUserByToken(token);
    if (user === null) {
      res.status(403).json({ error: "more or less than one user found - forbidden" });
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

          res.cookie('jwt', token, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' });

          const accessToken = jwt.sign(
            { email: user.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "600s" }
          )
          
          res.json(accessToken);
      }
    )
  } catch (err) {
    next(err);
  }
})

export { router as authRouter }