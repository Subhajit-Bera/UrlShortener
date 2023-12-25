const express = require("express");
const router = express.Router();
const { profile, signUp, signIn, userRegister,userLogin,update,userLogout  } = require("../controllers/userController");
const {home}=require("../controllers/urlController");
const passport = require("passport");

router.route("/profile").get(passport.checkAuthentication, profile);
router.route("/update").post(passport.checkAuthentication, update);

router.route("/").get(signIn);
router.route("/sign-up").get(signUp);
router.route("/home").get(home);

router.route("/register").post(userRegister);

router.route("/userLogin").post(passport.authenticate("local", { failureRedirect: "/" }),userLogin );
    
router.route("/sign-out").get(userLogout);    

module.exports = router;