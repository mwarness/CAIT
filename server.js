const express = require("express");
var session = require("express-session");

const mongoose = require("mongoose");
const routes = require("./routes");

// const path = require("path");
// const axios = require("axios");

var passport = require("./config/passport");
// var faceapi = require("face-api.js");
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// * CORs config
app.use(cors());

// * Passport config
app.use(session({ secret: "the blue dog jumps over the red moon", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/heroku_tmwk490b");

//mlab
// mongodb:
//<jessica>:<cobain1989>@ds333238.mlab.com:33238/heroku_tmwk490b

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;