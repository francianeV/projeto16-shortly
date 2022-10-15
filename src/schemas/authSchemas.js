import joi from 'joi';

const signUpSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
})

export default signUpSchema;