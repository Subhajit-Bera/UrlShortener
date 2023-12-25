const User = require("../models/user");


//render Profile page
module.exports.profile = function (req, res) {
    return res.render("user_profile", {
        title: "User Profile",
        profile_user: req.user,
    });
};


// render the Sign In page
module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.render("home", {
            title: "Home",
            "enteredUrl":"",
            "generatedLink":""
            
        });
    }
    return res.render("user_sign_in", {
        title: "Url Shortener | Sign In",
    });
};

// render the Sign Up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.render("home", {  //home
            title: "Home",
            "enteredUrl":"",
            "generatedLink":""
            
        });
    }
    return res.render("user_sign_up", {
        title: "Url Shortener | Sign Up",
    });
};


//User Register
exports.userRegister = (async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            req.flash("error", "Email already registed!");
            return res.redirect("back");
        }

        await User.create({
            name,
            email,
            password,
        });

        req.flash("success", "Account created!");
        return res.redirect("/");

    } catch (err) {
        console.log(err);
        req.flash("error", "Couldn't sign up");
        return res.redirect("back");
    }
})

// sign in and create a session for the user
module.exports.userLogin = (req, res) => {
    req.flash("success", "Logged in successfully");
    return res.redirect("/home");
};

// updates user details
module.exports.update = async function (req, res) {
    try {
        const user = await User.findById(req.user.id);
        const { name, password } = req.body;


        if (!user) {
            req.flash("error", "User does not exist!");
            return res.redirect("back");
        }

        user.name = name;
        user.password = password;

        user.save();
        req.flash("success", "profile updated!");
        return res.redirect("back");
    } catch (err) {
        req.flash("error", err);
        console.log(err);
        return res.redirect("back");
    }
};



// logout and clears the cookie
module.exports.userLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        return res.redirect("/");
    });
};
