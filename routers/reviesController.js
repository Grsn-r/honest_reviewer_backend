import express from 'express';
import { getReviews, createReview } from '../controllers/reviews';

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);