import { compareSync, hashSync } from "bcrypt"
import User from "../../../DB/models/user.model.js"
import { emitter } from "../../../Services/send-email.service.js"
import { HTML_TEMPLATE_confirmEmail } from "../../../utils/html-template.utils.js"
import { signToken } from "../../../utils/jwt.utils.js"
import { v4 as uuidv4 } from 'uuid';
import BlackListTokens from "../../../DB/models/black-list-tokens.model.js"





export const signUpService = async (req, res) => {
    const {name, email, password, confirmPassword, phone} = req.body

    if(password != confirmPassword){
        return res.status(400).json({message: 'Password & confirm password should be matched'})
    }

    const isEmailExist = await User.findOne({email})
    if(isEmailExist){
        return res.status(400).json({message: 'Email already exist'})
    }

    const otp = Math.floor(Math.random() * 10000)
    const expiresIn = new Date(Date.now() + 10 * 60 * 1000)     // 10 min
    const hashedOtp = hashSync(otp.toString(), +process.env.SALT_ROUNDS)

    emitter.emit('sendEmail', {
        to: email,
        subject: 'Verify your email',
        html: HTML_TEMPLATE_confirmEmail(otp)
    })

    const user = {
        name,
        email,
        password,
        phone,
        OTP: {
            code: hashedOtp,
            expiresIn
        }
    }

    await User.create(user)

    return res.status(200).json({message: 'User created successfully'})
}



export const confirmOtpService = async (req, res) => {
    const {email, otp} = req.body

    const user = await User.findOne({email, isConfirmed: false})
    if(!user){
        return res.status(404).json({message: 'User not found'})
    }

    if(new Date(user.OTP.expiresIn) < new Date()){
        return res.status(400).json({message: 'OTP expired'})
    }

    const isOtpmatched = compareSync(otp.toString(), user.OTP.code)
    if(!isOtpmatched){
        return res.status(400).json({message: 'Invalid OTP'})
    }

    await User.findOneAndUpdate(
        {email}, 
        {
            $set: { isConfirmed: true },
            $unset: { OTP: '' }
        },
        { new: true }
    )
    return res.status(200).json({message: 'User email verified successfully'})
}



export const signInService = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message: 'Invalid credientials'})
    }
    
    const isPasswordMatched = compareSync(password, user.password)
    if(!isPasswordMatched){
        return res.status(400).json({message: 'Invalid credientials'})
    }

    const accesstoken = signToken(
        {
            data: {_id: user._id, email: user.email},
            secretKey: process.env.SECRET_KEY_ACCESS,
            options: {expiresIn: process.env.ACCESS_EXPIRATION_TIME, jwtid: uuidv4()}
        }
    )

    const refreshtoken = signToken(
        {
            data: {_id: user._id, email: user.email},
            secretKey: process.env.SECRET_KEY_REFRESH,
            options: {expiresIn: process.env.REFRESH_EXPIRATION_TIME, jwtid: uuidv4()}
        }
    )

    return res.status(200).json({message: 'User logged in successfully', accesstoken, refreshtoken})
}



export const signOutService = async (req, res) => {
    const {refreshToken} = req
    const {token} = req.authUser

    await BlackListTokens.insertMany(
        [
            {
                tokenId: token.tokenId,
                expiryDate: token.expiryDate
            },
            {
                tokenId: refreshToken.tokenId,
                expiryDate: refreshToken.expiryDate
            }
        ]
    )
    return res.status(200).json({message: 'User logged out successfully'})
} 