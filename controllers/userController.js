const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.userRegister = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exist")
    }

    const user = await User.create({
        name,
        email,
        password,
    });
    res.status(201).json({
        status: "success",
        message: "User Registered Successfully",
        user
    });

})