import { celebrate, Joi } from "celebrate";

const validateCreateUser = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        bio: Joi.string().max(300),
    })
});

const validateLogin = celebrate({
    body: Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().required(),
    })
})

const validateComment = celebrate({
    body: Joi.object().keys({
        text: Joi.string().max(200),
    })
})

const validateReview = celebrate({
    body: Joi.object().keys({
        title: Joi.string().required().min(10).max(50),
        text: Joi.string().required().max(400),
    }).unknown(true),
})

export {validateCreateUser, validateLogin, validateComment};