import express from 'express';
import { checkAccessToken } from '../config/checkAccessToken';
import { getStats, getUserByToken, updateStats } from './db';

const router = express.Router();

router.use(checkAccessToken);

router.post('/signout', (req, res, next) => {
    res.clearCookie('jwt', { httpOnly: true, path: '/', domain: 'localhost' });
    res.sendStatus(204);
})


router.get('/stats', async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token === undefined) {
      res.status(401).json({ error: "no refresh token" });
      return;
    }
    const user = await getUserByToken(token);
    if (user === null) {
      res.status(403).json({ error: "more or less than one user found - forbidden" });
      return;
    }
    const stats = await getStats(user.id);
    res.json(stats);
})

router.post('/update', async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token === undefined) {
    res.status(401).json({ error: "no refresh token" });
    return;
  }
  const user = await getUserByToken(token);
  if (user === null) {
    res.status(403).json({ error: "more or less than one user found - forbidden" });
    return;
  }
  const { best_time } = req.body;
  await updateStats(user.id, best_time);
})

export { router as userRouter }