import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { createUser, login } from './controllers/users.js';
import helmet from 'helmet';
import mongoose from 'mongoose';
import auth from './middleware/auth.js';

mongoose.connect(process.env.MONGO_URI);
const app = express();
app.use(helmet());
app.use(express.json());
app.post('/login', login);
app.post('/register', createUser);
app.use(auth);

app.listen(process.env.PORT, () => {
    console.log(`server ejecutandose en ${process.env.PORT}`);
})