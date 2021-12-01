'use strict';

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LugarSchema = Schema({
    nombre: String,
    apellido: String,
    local: Number,
    focos: Number,
    precioUnidad: Number,
    precioTotal: Number,
    debe: Number,
    year: String,
    cuotas: [{
        cantidad: Number,
        fecha: String
    }],
    estado: String
})

module.exports = mongoose.model('Lugar', LugarSchema);