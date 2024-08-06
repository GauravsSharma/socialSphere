const app = require("./app");
const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
})

connectDatabase()
app.listen(process.env.PORT, () => {
    console.log("Server started at port: ", process.env.PORT);
})