const express =require("express");
const app = express();

app.use(express.json());

//Routes
const user = require("./routes/userRoute");
const url=require("./routes/urlRoute");


app.use("/api/v1",user);
app.use("/api/v1",url);

module.exports=app;