const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");

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
    },
    
})


// encrypt password before saving it in database
userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // validate the password with passed on user password
  userSchema.methods.isValidatedPassword = async function(userSentPassword){
    return await bcrypt.compare(userSentPassword, this.password);
  };

module.exports = mongoose.model("User", userSchema);