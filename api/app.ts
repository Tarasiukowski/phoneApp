require('dotenv').config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { connectDB } from './utils';
import { withRouter } from './routes';
import { useMiddlewares } from './middlewares';

export const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

connectDB();

useMiddlewares(app);
withRouter(app);
