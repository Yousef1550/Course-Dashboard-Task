import Joi from "joi";




export const signUpSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')),
        phone: Joi.string().required(),
    })
}

export const confirmOtpSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.number().required()
    })
}


export const signInSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*])[A-Za-z\d@$!%*]{8,}$/).required()
    })
}

