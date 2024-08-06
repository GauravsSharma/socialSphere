const express = require("express");
const app = express();
const post = require("./routes/post")
const user = require("./routes/user")
const story = require("./routes/story")
const cookieParser = require('cookie-parser');
const cors = require("cors");

app.use(cors()); 
if (process.env.MODE_ENV !== "production") {
    require("dotenv").config({ path: "server/config/config.env" })
}
app.use(express.json({ limit: '10mb' }));

app.use(cookieParser({ sameSite: 'none' }))
app.use(express.urlencoded({extended:true}))

app.use("/api/v1",post);
app.use("/api/v1",user);
app.use("/api/v1",story);

module.exports = app;