import Review from '../models/review.js';
import { notFoundError, authError, badRquestError } from '../errors/errors.js';

const getReviews = (req, res, next) => {
    Review.find({})
    .populate('author')
    .populate('comments.author')
    .then(reviews => {
        const allReviews = reviews.map(rv => {
            const fullReview = { ...rv.toObject(), pictureUrl: rv.picture ? `${req.protocol}://${req.get('host')}/uploads/${rv.picture}` : null }
            return fullReview;
        })
        return res.status(200).json(allReviews);
    })
    .catch(next);
};

const createReview = (req, res, next) => {
    const {title, text} = req.body;
    const reviewData = {
        title,
        text,
        author: req.user._id,
    }
    if (req.file) {
        reviewData.picture = req.file.filename;
    }
    Review.create(reviewData)
    .then(review => {
        return res.status(200).json(review);
    })
    .catch(next);
}

const likeReview = (req, res, next) => {
    Review.findByIdAndUpdate(req.params.reviewID, {
        $addToSet: {likes: req.user._id},
        $pull: {dislikes: req.user._id},},
        {new: true})
    .then(like => {
        return res.status(200).send(like);
    })
    .catch(next);
}

const dislikeReview = (req, res, next) => {
    Review.findByIdAndUpdate(req.params.reviewID, {
        $addToSet: {dislikes: req.user._id},
        $pull: {likes: req.user._id}},
        {new: true})
    .then(dislike => {
        return res.status(200).send(dislike);
    })
    .catch(next);
}

const commentReview = (req, res, next) => {
    const {text} = req.body;
    const userId = req.user._id;
    Review.findById(req.params.reviewId).orFail()
    .then(review => {
        if (!review) {
            throw new notFoundError('review no encontrada');
        }
        const userComments = review.comments.filter(comment => comment.author.toString() === userId.toString());

        if (userComments.length >= 10) {
            throw new badRquestError('límite de comentarios alcanzado');
        }
        return Review.findByIdAndUpdate(req.params.reviewId, {
            $addToSet: {comments: {text: text, author: userId, createdAt: new Date()}}
            }, {new:true})
            .then(newComment => {
                res.status(200).json(newComment);
            });
    })
    .catch(next);
}

const removeComment = (req, res, next) => {
    const {reviewId, commentId} = req.params;
    Review.findById(reviewId).orFail()
    .then(review => {
        const comment = review.comments.id(commentId);
        if (!comment) {
            throw new notFoundError('comentario no encontrado');
        }
        if (!req.user || !comment.author.equals(req.user._id)) {
            throw new authError('no puedes borrar este comentario');
        }
        review.comments.pull(commentId);
        return review.save();
    })
    .then(updatedReview => {
        return res.status(200).json(updatedReview);
    })
    .catch(err => {
        console.error(err);
        next();
    });
}

const removeReview = (req, res, next) => {
    Review.findById(req.params.reviewId).orFail()
    .then(review => {
        console.log('Review found:', review._id);
        console.log('Review author:', review.author);
        if (review.author.equals(req.user._id)) {
            return Review.findByIdAndDelete(req.params.reviewId)
            .then(deleted => {
                res.status(200).send(deleted);
            });
        }
        throw new authError('no puedes borrar reviews de otros autores');
    })
    .catch(next);
}




export {getReviews, createReview, likeReview, dislikeReview, commentReview, removeReview, removeComment};