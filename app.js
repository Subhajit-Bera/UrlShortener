const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
dbConnect();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { PORT, SESSION_SECRET_KEY,DB_URL } = process.env; //, 
const expressLayouts = require("express-ejs-layouts");


// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");



const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayouts);


// set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "url-shortener",
    secret: SESSION_SECRET_KEY,
    saveUninitialized: false, //usernot loged in or identity not initialize-->we dont need to extra data in session cookie
    resave: false, //identity initialize ,means user data present in session data
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl:DB_URL,
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);



//Routes
const user = require("./routes/userRoute");
const url = require("./routes/urlRoute");

app.use("/", user);
app.use("/", url);


app.listen(PORT || 2030, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${PORT}`);
});


