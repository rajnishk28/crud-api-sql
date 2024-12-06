const jwt=require("jsonwebtoken")

const checkAuth = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token Not Found"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(403).send({ success: false, message: "Failed to authenticate user." })
            } else {
                // console.log(decoded)
                req.user = decoded
                next()
            }
        });
    } catch {
        return res.status(401).json({
            success: false,
            message: "You are Not Authenticated"
        })
    }
}

module.exports={
    checkAuth
}