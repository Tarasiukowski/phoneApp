require('dotenv').config();

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { connectDB } from './utils';
import { useRouter } from './routes';
import { useMiddlewares } from './middlewares';
import { useSocketio } from './socket';

export const app = express();
export const server = http.createServer(app);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

connectDB();

useMiddlewares(app);
useRouter(app);
useSocketio(server);
