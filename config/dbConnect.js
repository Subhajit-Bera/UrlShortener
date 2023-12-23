const mongoose = require("mongoose");

const DB_URL ="mongodb://localhost:27017/url";
const dbConnect = async () => {
    mongoose.connect(DB_URL).then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    });

    
}

module.exports = dbConnect;