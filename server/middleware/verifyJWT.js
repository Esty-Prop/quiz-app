const jwt=require("jsonwebtoken")

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.header.Authorization
    if (!authHeader || !authHeader.toString().startsWith("Bearer")) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: {authHeader}
        })
    }

    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    error: true,
                    message: "Forbidden user",
                    data: null
                })
            }
            req.user = decoded
            next()
        })
}

module.exports = verifyJWT;


