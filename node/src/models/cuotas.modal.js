'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuotaSchema = Schema({
    lugar: {type: Schema.Types.ObjectId, ref:'Lugar'},
    cuotas: [{
        cantidad: Number,
        fecha: String
    }],
    subTotal: Number
})

module.exports = mongoose.model('Cuota', CuotaSchema)