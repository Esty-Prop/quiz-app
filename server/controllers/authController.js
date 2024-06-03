
const jwt=require('jsonwebtoken')
const User = require("../models/User")
const bcrypt = require("bcrypt")
const register = async (req,res)=>{
    const { username, password, lastName, firstName, email, roles, active } = req.body
    //validation
    if (!username || !firstName || !password ) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    if (roles && ['Admin', 'user'].indexOf(roles) === -1) return res.status(404).send('Roles can only be "Admin" or "User')

    const uniqueUsername = await User.findOne({ username: username }).lean()
    if (uniqueUsername) {
        return res.status(409).json({
            error: true,
            message: "Duplicate User",
            data: null
        })
    }
    const hashPwd = await bcrypt.hash(password, 10)

    const user = await User.create({ username, password: hashPwd, lastName, firstName, email, roles, active })
    if (!user) {
        return res.status(400).json({
            error: true,
            message: "Error while adding new user",
            data: null
        })
    }
    res.status(201).json({
        error: false,
        message:  `Add user success`,
        data: {username: user.username, _id: user._id}
    })
}
const login = async (req,res) =>{
    const {username, password} = req.body

    if(!username || !password) {
        return res.status(401).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    //get the user from the DB
    const foundUser = await User.findOne({username: username, deleted: false, active:true}).lean()
    if(!foundUser) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized ",
            data: null
        })
    }
    //
    const match = await bcrypt.compare( password, foundUser.password)
    if(!match) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })
    }

    // give the token to the user

    const userInfo  = {
        _id: foundUser._id,
        username: foundUser.username,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email:foundUser.email,
        roles: foundUser.roles,
    }

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})

    const refreshToken = jwt.sign({username: foundUser.username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'} )

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 7*24*60*60*1000
    })

    res.json({accessToken: accessToken})
}


const refresh = async (req,res) =>{
    const cookies = req.cookies
    if(!cookies?.jwt) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })
    }
    const refreshToken = cookies.jwt

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET, 
        async (err,decode) =>{
            if(err){
                return res.status(403).json({
                    error: true,
                    message: "Forbidden",
                    data: null
                })
            }
            const foundUser = await User.findOne({username: decode.username, deleted: false, active:true}).lean()
            const userInfo  = {
                _id: foundUser._id,
                username: foundUser.username,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                email:foundUser.email,
                roles: foundUser.roles,
            }
        
            const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
        
            res.json({accessToken: accessToken})
        })

}

const logout = async(req, res) =>{
    const cookies = req.cookies
    if(!cookies?.jwt){
        return res.status(204).json({
            error: true,
            message: "No Content",
            data: null
        })
    }
    res.clearCookie("jwt",  {
        httpOnly: true
    })
    res.json({
        error: false,
        message: "Cookie Cleard",
        data: null
    })
}

module.exports = {login,register, refresh, logout}