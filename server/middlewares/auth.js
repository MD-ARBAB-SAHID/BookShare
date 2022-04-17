const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const  dotenv= require("dotenv")
const path = require("path")
dotenv.config({path:path.join(__dirname,"../",".env")});
import { getAuth } from "firebase-admin/auth";
const auth = (req,res,next)=>{
    if(req.method==="OPTIONS"){
        return next();
    };

    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token)
      {
        return next(new HttpError("Authorization failed",402));
      }  else{
     
        const decodedToken = await getAuth().verifyIdToken(token);
            req.userData = decodedToken.uid;
            next(); 
    }
}catch(err){
        return next(new HttpError("Auth failed",402));
      };
 
  
}

module.exports = auth;
