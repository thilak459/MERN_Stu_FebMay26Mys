const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email:{
       type:Stirng,
       required:true,
       lowercase:true,
       index:true 
    },
    otp:{
        type:String,
        required:true,
        select:false
    },
    expiresAt:{
        type:Date,
        required:true
    },
    attempts:{
        type:Number,
        default:0
    },
},
{
    timestamps:true
});

// TTL index
otpSchema.index({expiresAt:1},{expireAfterSeconds:0});

// Export
module.exports = mongoose.model("OTP",otpSchema);