'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const userController = require("../controllers/user.controller");

var api = express.Router();

api.post('/Login', userController.Login)

module.exports = api;