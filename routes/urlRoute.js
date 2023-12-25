const express=require("express");
const router=express.Router();
const{shortenUrl,redirectToOriginal}=require("../controllers/urlController")

router.route("/shorten").post(shortenUrl);

router.route("/:shortUrl").get(redirectToOriginal);

module.exports=router;