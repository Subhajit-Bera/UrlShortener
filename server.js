const app =require("./app");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");

dotenv.config({ path: "UrlShortener/config/config.env" });
dbConnect();

const PORT = process.env.PORT || 2030;
const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
});
