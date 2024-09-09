import express from 'express';
import router from './router/router';
import cors from 'cors';
import { mongoDB } from './config/db_config';

const app = express();

app.use(express.json());

mongoDB.connect();

app.use(cors({
    origin: 'https://taskmanagement-fa2qpwrfo-macs-projects-c4ad142a.vercel.app',
    methods: '*',
    credentials: false
}));

app.use(router);

export default app;