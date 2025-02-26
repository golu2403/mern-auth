import express, { Request, Response } from 'express'
import connectTodb from './config/db';
import dotenv from "dotenv";
import cors from 'cors'
import { APP_ORIGIN } from './constant/env';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler';
import catchError from './utils/catchError';
import { OK } from './constant/http';
import authRoutes from './routes/auth.routes';
 dotenv.config();


const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(
    cors({
        origin:APP_ORIGIN,
        credentials:true
    })
)

app.use(cookieParser())

app.use('/auth',authRoutes)





app.use(errorHandler)


app.listen(8080,async()=>{
    console.log(`server is running on port 8080`);
    await connectTodb();
})