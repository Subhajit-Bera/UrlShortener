const mongoose = require("mongoose");
require("dotenv").config();


const dbConnect = () => {
    mongoose.connect(process.env.DB_URL).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    });

    
}

module.exports = dbConnect;