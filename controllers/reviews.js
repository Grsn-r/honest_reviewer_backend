import Review from '../models/review.js';
import { notFoundError, authError } from '../errors/errors.js';

const getReviews = (req, res, next) => {
    Review.find({})
    .populate('author')
    .popilate('comments.author')
    .then(reviews => {
        return res.status(200).json(reviews);
    })
    .catch(next);
};

const createReview = (req, res, next) => {
    const {title, text, picture} = req.body;
    Review.create({title, text, author: req.user._id, picture})
    .then(review => {
        return res.status(200).json(review);
    })
    .catch(next);
}

export {getReviews, createReview};