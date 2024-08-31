import express from 'express';
import { signUp , login , logout , getMe} from "../contollers/auth.controller.js";
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();


router.get('/me',protectRoute,getMe);
router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);


export default router;