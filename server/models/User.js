const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        uniqe:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true,
    },
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        lowercase:true,
        trim:true,
    },
    roles:{
        type:String,
        enum: ['Admin','User'],
        default:'User',
    },
    active:{
        type:Boolean,
        default:true,
    },
    deleted: {
        type: Boolean,
        required: true,
        default:false
    }
},{
    timestamps:true
})
module.exports = mongoose.model("User",userSchema)