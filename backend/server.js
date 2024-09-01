import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {v2 as cloudinary} from 'cloudinary';
import path from "path"

import authRoutes from './routes/auth.route.js';
import complierRoutes from './routes/complier.route.js';
import courseRoutes from './routes/course.route.js';
import connectDb from './db/connectDb.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY ,
    api_secret : process.env.CLOUDINARY_API_SECRET
})
const __dirname = path.resolve();

const app = express();

app.use(cors(
    {
        origin: ['http://localhost:3000'],
        credentials: true,
    }
));

app.use(express.json({limit :"5mb"}))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth",authRoutes)
app.use("/api/complier" , complierRoutes)
app.use("/api/course" , courseRoutes)


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname , "/frontend/build")))
    app.get("*" , (req , res)=>{
        res.sendFile(path.resolve(__dirname , "frontend" , "build" , "index.html"))
    }
    )
}


app.listen(PORT, () => {
    console.log('Server is running on port 5000');
    connectDb();
});
    