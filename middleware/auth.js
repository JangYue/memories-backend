import jwt,{decode} from "jsonwebtoken"

const auth = (req,res,next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        // token长度小于500的为自己定义的token 
        //          大于500的伪谷歌定义的token
        const isCustomAuth = token?.length<500;
        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token,'test');
            req.userId = decodedData?.id;
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    }catch(error){
        console.log(error);
    }
}

export default auth;