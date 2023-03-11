import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from './authRoutes';
import cors from 'cors';
import { corsOptionsDelegate } from '../config/corsOptions';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptionsDelegate));

app.use('/', authRouter);

const port = 3001;

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})