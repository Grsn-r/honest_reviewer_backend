import express from 'express';
import { getUser, updateUser, setPassword } from '../controllers/users.js';


const router = express.Router();

router.get('/me', getUser);
router.patch('/me/profile', updateUser);
router.patch('/me/password', setPassword);

export default router;
