import express from 'express';
import { getUser, updateUser } from '../controllers/users.js';


const router = express.Router();

router.get('/me', getUser);
router.patch('/me', updateUser);

export default router;