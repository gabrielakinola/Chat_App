const express = require("express");
const fs = require("fs");
const path = require("path");
const http = require("http");
const app = express();
const publicDir = path.join(__dirname, "../public");

const server = http.createServer(app);
app.use(express.static(publicDir));

module.exports = app;
