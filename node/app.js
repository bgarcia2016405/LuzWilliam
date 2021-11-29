'use strict'

const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")

const user_rutes = require("./src/rutes/user.rutes");
const lugar_rutes = require("./src/rutes/lugar.rutes");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// CABECERAS
app.use(cors());

// CARGA DE RUTAS
app.use('/api',
                user_rutes,
                lugar_rutes);

module.exports = app;