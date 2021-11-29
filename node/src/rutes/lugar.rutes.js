'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const lugarController = require("../controllers/lugar.controller");

var api = express.Router();

api.post('/CrearLugar', authenticated.ensureAuth ,lugarController.crearLugar)

api.put('/EditarLugar/:id',authenticated.ensureAuth, lugarController.modificar);

api.delete('/EliminarLugar/:id', authenticated.ensureAuth, lugarController.eliminar);

api.get('/ListarXYear/:year', lugarController.listarXAño)

api.get('/ListarXLugarYear/:lugar', lugarController.listarXLugarAño)

api.put('/PagarCuota/:lugar', lugarController.agregarCuota)

module.exports = api;