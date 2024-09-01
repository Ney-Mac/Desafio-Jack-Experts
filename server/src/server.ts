import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send({ status: 'Ok' })
});

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
});