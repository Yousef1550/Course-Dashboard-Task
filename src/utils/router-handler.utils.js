import { globalErrorHandler } from "../Middleware/error-handler.middleware.js"
import courseController from "../Modules/Course/course.controller.js"
import userController from "../Modules/User/user.controller.js"







const routerHandler = (app) => {
    app.use('/user', userController)
    app.use('/course', courseController)

    app.get('/', async (req, res) => {
        return res.status(200).json({message: 'Welcome to Course App'})
    })

    app.use(globalErrorHandler)
}


export default routerHandler