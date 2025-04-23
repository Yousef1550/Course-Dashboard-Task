import { cloudinary } from "../../../Config/cloudinary.config.js"
import Course from "../../../DB/models/course.model.js"




export const addCourseService = async (req, res) => {
    const {title, description, startDate, endDate, price} = req.body
    const {file} = req

    if(!file){
        return res.status(400).json({message: 'Course image required!'})
    }

    const courseObj = {
        title,
        description,
        startDate,
        endDate,
        price
    }

    const {secure_url, public_id} = await cloudinary().uploader.upload(
        file.path,
        {
            folder: `${process.env.CLOUDINARY_FOLDER}/Courses`,
            resource_type: 'image'
        }
    )

    courseObj.image = {
        secure_url,
        public_id
    }

    const course = await Course.create(courseObj)
    return res.status(200).json({message: 'Course addedd successfully', course})
}



export const getAllCoursesService = async (req, res) => {
    const courses = await Course.find()

    if(!courses){
        return res.status(404).json({message: 'No courses found'})
    }
    return res.status(200).json({message: 'Courses fetched successfully', courses})
}



export const getCourseService = async (req, res) => {
    const {_id} = req.params   // course id

    const course = await Course.findById(_id)
    if(!course){
        return res.status(404).json({message: 'Course not found'})
    }
    return res.status(200).json({message: 'course fetched successfully', course})
}



export const updateCourseService = async (req, res) => {
    const {title, description, startDate, endDate, price} = req.body
    const {_id} = req.params
    const {file} = req

    
    const course = await Course.findById(_id)
    if(!course){
        return res.status(404).json({message: 'Course not found'})
    }

    const updatedCourseObj = {title, description, startDate, endDate, price}

    if(file){
        if(course.image){
            await cloudinary().uploader.destroy(course.image.public_id)
        }
        const {secure_url, public_id} = await cloudinary().uploader.upload(
            file.path,
            {
                folder: `${process.env.CLOUDINARY_FOLDER}/Courses`,
                resource_type: 'image'
            }
        )
        updatedCourseObj.image = {
            secure_url,
            public_id
        }
    }

    const updateCourseData = await Course.findByIdAndUpdate(
        course._id,
        updatedCourseObj,
        {new: true}
    )
    return res.status(200).json({message: 'Course updated successfully', updateCourseData})
}




export const deleteCourseService = async (req, res) => {
    const {_id} = req.params

    const course = await Course.findByIdAndDelete(_id)
    if(!course){
        return res.status(404).json({message: 'Course not found'})
    }
    await cloudinary().uploader.destroy(course.image.public_id)
    
    return res.status(200).json({message: 'Course deleted successfully'})
}