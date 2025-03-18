const express = require("express");
const morgan = require("morgan");
const log4js = require("log4js");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./routes/user.routes");
const connectDB = require("./config/database");

const app = express();

connectDB();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);

module.exports = app;