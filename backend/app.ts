require('dotenv').config();

import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { connectDB } from './utils/connectDB';
import { withRouter } from './routes';

export const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

connectDB();

withRouter(app);