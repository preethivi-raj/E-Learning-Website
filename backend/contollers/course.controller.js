import Course from "../models/course.model.js";
import {v2 as cloudinary} from "cloudinary"
import User from "../models/user.model.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if(!courses) return res.status(404).json({ message: "No courses found" });
    res.status(200).json(courses);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({ message: error });
  }
};

export const createCourse = async (req, res) => {
    try {
        const {title , description ,instructor ,link  } = req.body;
        let {img} = req.body;

        const existingCourse = await Course.findOne({title: title});

        if(existingCourse) return res.status(400).json({ message: "Course already exists" });

        if(!title || !description || !instructor || !img || !link ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}
        const newCourse = new Course({
            title,
            description,
            instructor,
            img,
            link,
        });

        await newCourse.save();

        res.status(201).json(newCourse);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: error });
    }
};


export const getCourseById = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findById({ _id: id });
        
        if(!course) return res.status(404).json({ message: "Course not found" });

        res.status(200).json(course);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: error });
    }
};

export const createComment = async (req, res) => {
    try {
        const userId = req.user._id;
        const course_id = req.params.id;
        const text = req.body.text;

        if( !text) return res.status(400).json({ message: "Please Fill the comment box" });

        const course = await Course.findById({ _id: course_id });
        const userName = await User.findById({ _id: userId }).select("fullName"); 
        

        if(!course) return res.status(404).json({ message: "Course not found" });

        const comment = {
            user: userId,
            text: text,
            name: userName.fullName,
        }

        course.comments.push(comment)

        await course.save();

        res.status(200).json(course);        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: error });
    }
}

export const deteleComment = async (req, res) => {
    try {
        const course_id = req.params.id;
        const comment_id = req.body.id;

        const course = await Course.findById({ _id: course_id });

        if(!course) return res.status(404).json({ message: "Course not found" });

        const comment = course.comments.find((comment) => comment._id == comment_id);

        if(!comment) return res.status(404).json({ message: "Comment not found" });

        if(comment.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Unauthorized" });

        course.comments = course.comments.filter((comment) => comment._id.toString() !== comment_id.toString());

        await course.save();

        res.status(200).json(course);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: error });
    }
}

export const createNote = async (req, res) => {
    try {
        const course_id = req.params.id;
        const {text, link} = req.body;

        if( !text || !link) return res.status(400).json({ message: "All fields are required" });

        const course = await Course.findById({ _id: course_id });

        if(!course) return res.status(404).json({ message: "Course not found" });

        const note = {
            text,
            link,
        }

        course.notes.push(note)

        await course.save();

        res.status(200).json(course);        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: error });
    }
}

export const getNotes = async (req, res) =>{
    try {
        const {id} = req.body;
        const course = await Course.findById({ _id: id });

        if(!course) return res.status(404).json({ message: "Course not found" });

        res.status(200).json(course.notes);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({ message: error });
    }
}