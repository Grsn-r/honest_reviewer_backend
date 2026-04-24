import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { createUser, login } from './controllers/users.js';
import helmet from 'helmet';
import auth from './middleware/auth.js';
import connectMongoDb from './connectMongoDB.js';
import users from './routers/usersRouter.js';
import reviews from './routers/reviewsRouter.js';
import { validateCreateUser, validateLogin } from './middleware/validator.js';
import { reqLogger, errorLogger } from './middleware/logger.js';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import path from 'path';

const PORT = process.env.PORT || 3001;
const limiter = rateLimit({
    windowMs:15*60*100,
    max: 50,
    message: 'demasiadas solicitudes desde esta IP'
})
connectMongoDb();
const app = express();
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(cors({
    origin: [
        'http://localhost:3000',      
    ]
}))
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(reqLogger);
app.post('/login', validateLogin, login);
app.post('/register', validateCreateUser, createUser);
app.use(auth);
app.use('/users', users);
app.use('/', reviews);
app.use(errorLogger);
app.use((err, req, res, next) => {
    if (err.code === 11000 ) {
        return res.status(400).send({message: 'correo ya registrado'});
    }
    if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({message: 'Elemento no encontrado'});
    }
    const {statusCode = 500, message} = err;
    res.status(statusCode).send({message: statusCode === 500 ? 'Error de servidor' : message})
});

app.listen(PORT, () => {
    console.log(`server ejecutandose en ${PORT}`);
})