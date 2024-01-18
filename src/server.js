const express = require("express");
const bodyParser = require("body-parser");
const viewEngine = require("./config/viewEngine.js");
const { initWebRouters } = require("./route/web.js");
const { connectDB } = require("./config/connectDB.js");
const cors = require('cors');
const dotenv = require("dotenv").config();


const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // hoặc '*' nếu bạn muốn cho phép từ tất cả các nguồn
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRouters(app);

connectDB();

const port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("running on the port: " + port)
});
