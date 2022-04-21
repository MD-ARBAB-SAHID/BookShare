import HttpError from "../model/http-error.js";
import {getAuth} from "firebase-admin/auth"
const authMiddleware = async (req,res,next)=>{
    if(req.method==="OPTIONS")
    {
        return next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];

        if(!token)
        {
          return next(new HttpError("Authorization failed",401));
        }
      
    const decodedToken = await getAuth().verifyIdToken(token);
   
    if(!decodedToken)
    {
        return next(new HttpError("Authorization failed",401)); 
    }
    req.userId = decodedToken.uid;
    next();
    }catch(error)
    {     
         const errorMessage = error.message;
        return next(new HttpError(error.errorInfo.code.substring(5),401));
    }
     
}

export default authMiddleware;
