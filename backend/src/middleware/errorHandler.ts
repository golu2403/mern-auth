import { ErrorRequestHandler } from "express";


const errorHandler:ErrorRequestHandler=(error,req,res,next)=>{
    console.log(`PATH: ${req.path}`,error);
    throw res.status(500).send("Internal server error");

}
export default errorHandler