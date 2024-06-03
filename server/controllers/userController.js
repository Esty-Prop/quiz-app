const User = require("../models/User")
const bcrypt = require("bcrypt")

const getUsers = async (req, res) => {
    const users = await User.find({deleted: false }, { password: 0 }).lean()
    if (!users.length) {
        return res.status(400).json({
            error: true,
            message: "No users",
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: users
    })
}
const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id, { password: 0 }).lean()
    if (!user) return res.status(404).json("No user found")
    res.json({
        error: false,
        message: "",
        data: {user}
    })
}
const addUser = async (req, res) => {
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
const updateUser = async (req, res) => {
    const { _id, username, password, lastName, firstName, email, roles, active } = req.body
    if (!_id || !username || !firstName ) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({
            error: true,
            message: "No User found",
            data: null
        })
    }
    if(password){
        const hashPwd = await bcrypt.hash(password, 10)
        user.password = hashPwd
    }
    user.username = username
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.roles = roles
    user.active = active
    const updateUser = await user.save()
    res.json({
        error: false,
        message: `Update user ${_id} success`,
        data: {username: updateUser.username, _id: updateUser._id}
    })
}
const deleteUser = async (req, res) => {
    const {_id } = req.body
    if( !_id ){
        return res.status(400).json({
            error: true,
            message: "Id is required",
            data: null
        })
    }
    const user = await User.findById(_id)
    if(!user){
        return res.status(400).json({
            error: true,
            message: "No User found",
            data: null
        })
    }
    user.deleted = true
    const updateUser = await user.save()
    res.json({
        error: false,
        message: "",
        data: {username: updateUser.username, _id: updateUser._id}
    })
}
const updateUserByUser = async (req, res) => {
    const { _id, username, password, lastName, firstName, email } = req.body
    if (!_id || !username || !firstName ) {
        return res.status(400).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({
            error: true,
            message: "No User found",
            data: null
        })
    }
    if(password){
        const hashPwd = await bcrypt.hash(password, 10)
        user.password = hashPwd
    }
    user.username = username
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    const updateUser = await user.save()
    res.json({
        error: false,
        message: `Update user ${_id} success`,
        data: {updateUser}
    })
}
module.exports = { getUsers, getUserById, addUser, updateUser, deleteUser,updateUserByUser }