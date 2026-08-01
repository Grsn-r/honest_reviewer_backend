import Review from '../models/review.js';
import { notFoundError, authError, badRquestError } from '../errors/errors.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';
import cloudinary from '../config/cloudinary.js';

const getReviews = (req, res, next) => {
    Review.find({})
    .sort({createdAt: -1})
    .populate('author')
    .populate('comments.author')
    .then(reviews => {
        const allReviews = reviews.map(rv => {
            const fullReview = { ...rv.toObject(), pictureUrl: rv.image?.url || null }
            return fullReview;
        })
        return res.status(200).json(allReviews);
    })
    .catch(next);
};

const createReview = async (req, res, next) => {
    try {
        const { title, text } = req.body;

        const reviewData = {
            title,
            text,
            author: req.user._id,
            image: null,
        };

        if (req.file) {
            const result = await uploadToCloudinary(
                req.file.buffer,
                "honest-reviewer/reviews"
            );

            reviewData.image = {
                url: result.secure_url,
                publicId: result.public_id,
            };
        }

        const review = await Review.create(reviewData);

        return res.status(201).json(review);
    } catch (error) {
        console.error("Error al crear review:", error);
        return next(error);
    }
};

const likeReview = (req, res, next) => {
    Review.findByIdAndUpdate(req.params.reviewId, {
        $addToSet: {likes: req.user._id},
        $pull: {dislikes: req.user._id},},
        {returnDocument: 'after'})
    .then(like => {
        return res.status(200).send(like);
    })
    .catch(next);
}

const dislikeReview = (req, res, next) => {
    Review.findByIdAndUpdate(req.params.reviewId, {
        $addToSet: {dislikes: req.user._id},
        $pull: {likes: req.user._id}},
        {returnDocument: 'after'})
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

        if (userComments.length >= 30) {
            throw new badRquestError('límite de comentarios alcanzado');
        }
        return Review.findByIdAndUpdate(req.params.reviewId, {
            $addToSet: {comments: {text: text, author: userId, createdAt: new Date()}}
            }, {new:true})
            .then(updatedRv => {
                return updatedRv.populate('comments.author')
            })
            .then(populated => {
                populated.comments.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
                res.status(200).json(populated);
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
        return updatedReview.populate('comments.author')
    })
    .then(populated => {
        res.status(200).json(populated);
    })
    .catch(err => {
        next();
    });
}

const removeReview = (req, res, next) => {
    Review.findById(req.params.reviewId).orFail()
    .then(review => {
        if (review.author.equals(req.user._id)) {
            cloudinary.uploader.destroy(review.image.publicId);
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