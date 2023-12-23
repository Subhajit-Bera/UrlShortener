const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required:true,
        // validate:validator.isEmail

    },
    password:{
        type:String,
        required:true,
        // select: false, //when we run find() method password will not be returned/accessed
    }

})

module.exports = mongoose.model("User", userSchema);