import mongoose from "mongoose";




const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        secure_url: String,
        public_id: String
    },
    startDate: Date,
    endDate: Date,
    price: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
})



const Course = mongoose.models.Course || mongoose.model('Course', courseSchema)


export default Course
