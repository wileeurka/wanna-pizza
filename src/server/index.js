require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const pizzaRoutes = require("./router/pizzaRoutes");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

// Routes
app.use("/api", router);
app.use("/api/pizzas", pizzaRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start server and connect to MongoDB
const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();

//npm init -y
//npm i express cors cookie-parser
//npm i nodemon --save-dev
//npm i dotenv
//npm i jsonwebtoken bcrypt uuid
//npm i nodemailer
//npm i express-validator
