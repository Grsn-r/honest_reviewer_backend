import express from 'express';
import {getReviews, createReview, likeReview, dislikeReview, commentReview, removeReview, removeComment} from '../controllers/reviews.js';
import { validateComment } from '../middleware/validator.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', createReview);
router.delete('/:reviewId', removeReview);
router.post('/:reviewID/comments', validateComment, commentReview);
router.delete('/:reviewId/comments', removeComment);
router.put('/reviewId/likes', likeReview);
router.delete('/:reviewId/likes', dislikeReview);

export default router;
