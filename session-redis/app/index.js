const express = require('express');
const sessionMiddleware = require('./middleware/session');
const corsMiddleware = require('./middleware/cors');


const app = express();

const authRouter = require('./router/authentication');
const profileRouter = require('./router/profile');

app.set('trust proxy', 1);
app.use(express.json());
app.options('*', corsMiddleware);
app.use(corsMiddleware);
app.use(sessionMiddleware);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.listen(3000, () => {console.log('listening ...')});