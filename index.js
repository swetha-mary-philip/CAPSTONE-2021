const express = require("express");
const bodyParser = require("body-parser");
const user = require("./APP_API/routes/user"); //new addition
const InitiateMongoServer = require('./app_server/models/db.js');
// Initiate Mongo Server
//InitiateMongoServer();
const app = express();
// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

app.all('/*', function(req, res, next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
 })

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});
/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});