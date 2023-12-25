const shortid = require('shortid');

const Url = require('../models/url');

////render home page
module.exports.home = (req, res) => {
    if (req.isAuthenticated()) {
        return res.render("home", {
            title: "Home",
            "enteredUrl":"",
            "generatedLink":""
            
        });
    }

    return res.redirect("/");
};

//Generate shorturl 
exports.shortenUrl = async (req, res) => {
    try {
        const { enterUrl } = req.body;
        if (!enterUrl) {
            req.flash("error", "Enter url first");
            return res.redirect("/home");
        }

        const shortUrl = shortid();
        const url=await Url.create({
            enterUrl,
            shortUrl
        });
        

        req.flash("success", "Url generated successfully");
        res.render("home", {
            title: "Home",
            enteredUrl: enterUrl,
            generatedLink: shortUrl,
        });
        

    } catch (error) {
        console.log(err);
        req.flash("error", "Internal server error");
        return res.redirect("/home");
    }


    // const url = new Url({ originalUrl, shortUrl});
};

//redirect the shorturl
exports.redirectToOriginal = async (req, res) => {
    try{
        const { shortUrl } = req.params;
        const url = await Url.findOne({ shortUrl });
        if (!url) {
            req.flash("error", "ShortUrl not found");
            return res.redirect("back");
        }
        res.redirect(url.enterUrl);
    }catch(err){
        req.flash("error", "Internal server error");
        return res.redirect("back");
    }    
}