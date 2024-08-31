import express from 'express';
import { getAllCourses , createCourse , getCourseById,createComment,deteleComment,createNote, getNotes } from '../contollers/course.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';   


const router = express.Router();

router.get('/',protectRoute ,getAllCourses)
router.post('/create', protectRoute,createCourse)
router.get("/:id", protectRoute,getCourseById)
router.post("/comment/:id", protectRoute,createComment)
router.post("/comment/delete/:id", protectRoute,deteleComment)
router.post("/notes/create/:id", protectRoute,createNote)
router.post("/notes", protectRoute,getNotes)

export default router;