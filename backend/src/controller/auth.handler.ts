import { z } from "zod";
import catchError from "../utils/catchError";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constant/http";


const registerSchema=z.object({
    email:z.string().email().min(1).max(255),
    password:z.string().min(6).max(255),
    confirmPassword:z.string().min(6).max(255),
    userAgent:z.string().optional(),
}).refine(
    (data)=>data.password===data.confirmPassword,{
        message:"password does not match",
        path:["confirmPassword"],
    }
)





export const registerHandler=catchError(
    async(req,res)=>{
        const request=registerSchema.parse({
            ...req.body,
            userAgent:req.headers["user-agent"],
        })
        //call service

        const {user,accessToken,refreshToken}=await createAccount(request);


        //return response

        return
        res.status(CREATED).json(user)

    }
)