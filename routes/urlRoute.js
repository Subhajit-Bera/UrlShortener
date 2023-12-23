const express=require("express");
const router=express.Router();
const{shortenUrl}=require("../controllers/urlController")

router.route("/shorten").post(shortenUrl);

module.exports=router;