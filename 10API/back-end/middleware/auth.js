jwt = require('jsonwebtoken');
bcrypt = require('bcrypt');

const auth = async (req,res,next)=>{
    try {
        let token = req.headers.authorization;
        if(!token)
        {
            return res.status(401).json({message:"Unauthorized"});
        }
        let decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
        if(!decoded)
        {
            return res.status(403).json({message:"Invalid token"});
        }

        if(decoded.email !== req.email)
        {
            return res.status(400).json({message:"Invalid email"});
        }
        console.log(decoded);
        const checkpassword = await bcrypt.compare(
            req.body.password,decoded.user.password
        );
        console.log(checkpassword);
        if(!checkpassword)
        {
            return res.status(403).json({ message: "Invalid password" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = auth;