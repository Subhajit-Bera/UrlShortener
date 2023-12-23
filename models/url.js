const mongoose=require("mongoose");

const urlSchema=new mongoose.Schema({
    enterUrl:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        unique: true,
        required:true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required:true,
    // }
})


module.exports = mongoose.model("Url",urlSchema);