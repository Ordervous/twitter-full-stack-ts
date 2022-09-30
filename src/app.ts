import morgan from "morgan";
import express, { NextFunction, Request, Response } from 'express'
import { db } from './models';
import tweetRoutes from './routes/tweetRoutes'
import userRoutes from './routes/userRoutes'

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/api/tweets', tweetRoutes);
app.use('/api/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

// Syncing our database
db.sync().then(() => {
    console.info("connected to the database!")
});

app.listen(3000);