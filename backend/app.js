const express = require("express");
const { xss } = require("express-xss-sanitizer");
const mongoSanitize = require("express-mongo-sanitize");
const { rateLimit } = require("express-rate-limit");

const app = express();

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Rate Limiting for the API
// General limit - 100 requests per 15 minutes
const generalLimiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again after an hour!",
});


// Auth limit - 10 requests per 15 minutes
const authLimiter = rateLimit({
  max: 10,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again after an hour!",
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the server side!",
    app: "E-Learn by Efat Sikder",
  });
});



module.exports = app;
