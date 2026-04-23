import User from '../models/user.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { notFoundError, authError } from '../errors/errors.js';

const getUser = (req, res, next) => {
    User.findById(req.user._id)
    .then(user => {
        if (!user) {
            throw new notFoundError('Usuario no encontrado');
        }
        const {_id, name, email, bio} = user;
        return res.status(200).json(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
    const {name, email, password, bio} = req.body;
    bcrypt.hash(req.body.password, 10)
    .then(hash => User.create({name, email, password: hash, bio}))
    .then(user => {
        return res.status(200).send({message: 'usuario registrado'});
    })
    .catch(next);
};

const login = (req, res, next) => {
    const {email, password} = req.body;
    User.findOne({email}).select('+password')
    .then(user => {
        if (!user) {
            throw new authError('datos erroneos');
        }
        return bcrypt.compare(password, user.password)
        .then(match => {
            if (match) {
                const token = jwt.sign({_id: user._id}, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'clave super secreta', {expiresIn: '7d'});
                return res.send({token});
            }
            throw new authError('contraseña incorrecta');
        })
    })
    .catch(next);
}

const updateUser = (req, res, next) => {
    const {name, bio} = req.body;
    const userId = req.user._id;
    User.findByIdAndUpdate(userId, {name, bio})
    .then(data => {
        if (data) {
            return res.status(200).send({message: 'datos actualizados'});
        }
        throw new notFoundError('Usuario no encontrado');
    })
    .catch(next);
}

const setPassword = (req, res, next) => {
    const {password, newPassword} = req.body;
    const userId = req.user._id;
    User.findOne(userId).select('+password')
    .then(user => {
        bcrypt.compare(password, user.password)
        .then(match => {
            if (match) {
                bcrypt.hash(req.body.newPassword, 10)
                .then(hash => User.findByIdAndUpdate(userId, {password: hash}))
            }
            throw new authError('contraseña incorrecta')
        })
    })
    .catch(next)
}

export  {getUser, createUser, login, updateUser, setPassword};