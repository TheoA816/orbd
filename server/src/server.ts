import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from './authRoutes';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);

const port = 3001;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})