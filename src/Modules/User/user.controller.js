import { Router } from "express";
import { confirmOtpService, signInService, signOutService, signUpService } from "./services/user.service.js";
import { errorHandler } from "../../Middleware/error-handler.middleware.js";
import { validationMiddleware } from "../../Middleware/validation.middleware.js";
import { confirmOtpSchema, signInSchema, signUpSchema } from "../../Validators/User/user.schema.js";
import { authenticationMiddleware, checkRefreshToken } from "../../Middleware/authentication.middleware.js";


const userController = Router()



userController.post('/signUp', errorHandler(validationMiddleware(signUpSchema)), errorHandler(signUpService))

userController.put('/confirmOtp', errorHandler(validationMiddleware(confirmOtpSchema)), errorHandler(confirmOtpService))

userController.post('/signIn', errorHandler(validationMiddleware(signInSchema)), errorHandler(signInService))

userController.post('/signOut', 
    errorHandler(authenticationMiddleware()),
    errorHandler(checkRefreshToken()),
    errorHandler(signOutService)
)

export default userController