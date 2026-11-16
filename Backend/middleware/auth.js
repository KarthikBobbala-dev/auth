const jwt = require('jsonwebtoken');

const auth = (req,res,next) => {
    console.log(req.headers);
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({
            status:false,
            message:'Unauthorized',
            data:null
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status:false,
            message:'Invalid or expired token',
            data:null
        })
    }
}
module.exports = auth;
