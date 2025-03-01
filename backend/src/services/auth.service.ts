import   Jwt  from "jsonwebtoken";
import VerificationCodeType from "../constant/verificationType";
import SessionModel from "../models/session.modal";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode";
import { oneYearFromNow } from "../utils/data";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constant/env";

export type  CreateAcoountParams={
    email:string,
    password:string,
    userAgent ?: string;

}

export const createAccount=async(data:CreateAcoountParams)=>{
   //verify existing user
   const existingUser=await UserModel.exists({
    email:data.email,
   })
   if(existingUser){
    throw new Error("user already exist");
   }
   //create user
   const user=await UserModel.create({
    eamil:data.email,
    password:data.password
   })
   
   //create verification code
   const verificationCode= await VerificationCodeModel.create({
    userId:user._id,
    type:VerificationCodeType.EmailVerification,
    expiresAt:oneYearFromNow()
   })

   //send verificatoion mail
   //create session
   const session= await  SessionModel.create({
    userId:user._id,
    userAgent:data.userAgent,
   })
//sign access token and refresh token
   const refreshToken= Jwt.sign(
     {sessionId:session.id},
     JWT_REFRESH_SECRET,{
        audience:["user"],
        expiresIn:"30d"
     }

   );

   const accessToken= Jwt.sign(
    {  
        userId:user._id,
        sessionId:session.id
    },
    JWT_SECRET,{
       audience:["user"],
       expiresIn:"15m"
    }

  );

  return{
    user,accessToken,refreshToken,
  }


}