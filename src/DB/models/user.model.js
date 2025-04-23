import mongoose from "mongoose";
import { hashSync } from "bcrypt";
import { decryption, encryption } from "../../utils/encryption.utils.js";




const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    OTP: {
        code: {
            type: String,
            required: true
        },
        expiresIn: {
            type: Date,
            required: true
        }
    },
    isConfirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJson: {           
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})


userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = hashSync(this.password, +process.env.SALT_ROUNDS)
    }

    if(this.isModified('phone')){
        this.phone = await encryption({value: this.phone, secretKey: process.env.SECRET_KEY_PHONE})
    }
    next()
})

userSchema.post('findOne', async function(doc){
    if(doc){
        doc.phone = await decryption({cipher: doc.phone, secretKey: process.env.SECRET_KEY_PHONE})
    }
})



const User = mongoose.models.User || mongoose.model('User', userSchema)


export default User