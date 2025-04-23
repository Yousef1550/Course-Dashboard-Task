import { Router } from "express";
import { authenticationMiddleware } from "../../Middleware/authentication.middleware.js";
import { errorHandler } from "../../Middleware/error-handler.middleware.js";
import { addCourseService, deleteCourseService, getAllCoursesService, getCourseService, updateCourseService } from "./Services/course.service.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import { MulterCloud } from "../../Middleware/multer.middleware.js";
import { imageExtentions } from "../../Constants/constants.js";
import { addCourseSchema, deleteCourseSchema, getCourseSchema, updateCourseSchema } from "../../Validators/Course/course.schema.js";


const courseController = Router()


courseController.use(errorHandler(authenticationMiddleware()))

courseController.post(
    '/addCourse',
    MulterCloud(imageExtentions).single('courseImage'),
    errorHandler(validationMiddleware(addCourseSchema)), 
    errorHandler(addCourseService)
)

courseController.get('/Courses', errorHandler(getAllCoursesService))

courseController.get('/course/:_id', errorHandler(validationMiddleware(getCourseSchema)), errorHandler(getCourseService))

courseController.put(
    '/updateCourse/:_id',
    MulterCloud(imageExtentions).single('courseImage'),
    errorHandler(validationMiddleware(updateCourseSchema)), 
    errorHandler(updateCourseService)
)

courseController.delete('/deleteCourse/:_id', errorHandler(validationMiddleware(deleteCourseSchema)), errorHandler(deleteCourseService))


export default courseController