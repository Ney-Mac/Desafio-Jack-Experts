import express from 'express';
import router from './router/router';
import cors from 'cors';
import { mongoDB } from './config/db_config';

const app = express();

app.use(express.json());

mongoDB.connect();

app.use(cors({
    origin: 'https://taskmanagerclient.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));

app.use(router);

export default app;