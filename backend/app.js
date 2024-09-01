const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/error");

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Route Import
const product = require("./routes/productRoute");
const user = require("./routes/userRouter");

app.use("/api/v1", product);
app.use("/api/v1", user);

// middleware for error

app.use(errorMiddleware);

module.exports = app;
