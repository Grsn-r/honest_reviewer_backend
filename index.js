import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { createUser, login } from './controllers/users.js';
import helmet from 'helmet';
import auth from './middleware/auth.js';
import connectMongoDb from './connectMongoDB.js';
import users from './routers/usersRouter.js';
import reviews from './routers/reviewsController.js';

connectMongoDb();
const app = express();
app.use(helmet());
app.use(express.json());
app.post('/login', login);
app.post('/register', createUser);
app.use(auth);
app.use('/users', users);
app.use('/', reviews);

app.listen(process.env.PORT, () => {
    console.log(`server ejecutandose en ${process.env.PORT}`);
})