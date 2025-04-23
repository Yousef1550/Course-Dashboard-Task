import Joi from "joi";





export const addCourseSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        price: Joi.number().required()
    })
}


export const getCourseSchema = {
    params: Joi.object({
        _id: Joi.string().hex().length(24).required() 
    })
}


export const updateCourseSchema = {
    body: Joi.object({
        title: Joi.string(),
        description: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        price: Joi.number()
    }),
    params: Joi.object({
        _id: Joi.string().hex().length(24).required()
    })
}


export const deleteCourseSchema = {
    params: Joi.object({
        _id: Joi.string().hex().length(24).required()
    })
}