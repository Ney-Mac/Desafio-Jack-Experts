import express from 'express';
import router from './router/router';
import cors from 'cors';
import { mongoDB } from './config/db_config';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) | 3000;

app.use(express.json());

mongoDB.connect();

app.use(cors({
    origin: '*',
    methods: '*',
    credentials: false
}));

app.use(router);

export default app;