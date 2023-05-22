var express = require('express');
var app = express();

var db = require('./db');  // 추가
var UserController = require('./user/UserController');  // 추가
app.use('/users', UserController);  // 추가

module.exports = app;
