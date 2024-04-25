import { NextFunction,Request,Response } from "express";

export const errorHandler = (error:any,req:Request,res:Response,next:NextFunction)=>{

  return  res.status(500).json({
        success:false,
        error:error.message
    })

}   