'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const lugarModel = require("../models/lugar.model");

const administrador ='Administrador'
const usuario = 'User';
const fecha = new Date();
const añoActual = fecha.getFullYear();
const fechaActual  = fecha.toLocaleDateString();

function crearLugar(req,res){
    var params = req.body;
    var LugarModel = new lugarModel();

    LugarModel.nombre = params.nombre;
    LugarModel.apellido = params.apellido;
    LugarModel.local = params.local;
    LugarModel.focos = params.focos;
    LugarModel.precioUnidad = params.precioUnidad;
    LugarModel.precioTotal = (LugarModel.precioUnidad * LugarModel.focos);
    LugarModel.debe = (LugarModel.precioUnidad * LugarModel.focos);
    LugarModel.year = añoActual
    LugarModel.estado = 'En Proceso'

    if(LugarModel.nombre.length == 0 ||
                        params.apellido.length == 0 ||
                        params.local.length == 0  ||
                        params.focos.length == 0  ||
                        params.precioUnidad.length == 0){
                            return res.status(404).send({report: 'Llene todos los campos'})
                        }

    lugarModel.findOne({
        local: params.local,
        year: añoActual
    },(err,localEncontrado)=>{
        if(err) return res.status(404).send({report: 'Error al buscar local'});

        if(localEncontrado) return res.status(404).send({report: 'El local ya fue registrado este año'});

        LugarModel.save((err, newLocal)=>{
            if(err) return res.status(404).send({report:'Error guardando local'});
            return res.status(200).send(newLocal);
        })
    })
}

function modificar(req,res){
    var params = req.body;
    var local = req.params.id;
    var type = req.user.type
    if(type != administrador) return res.status(404).send({report:'No eres admin'});

    lugarModel.findByIdAndUpdate(local,params,{new:true},(err,localActualizado)=>{
        if(err) return res.status(404).send({report: 'Error editando el local'});
        if(localActualizado == null) return res.status(500).send({ report: 'No se actualizo el local'})
        return res.status(200).send(localActualizado)
    })
}

function eliminar(req,res){
    var local = req.params.id;
    var type = req.user.type
    if(type != administrador) return res.status(404).send({report:'No eres admin'});

    lugarModel.findByIdAndDelete(local,(err,userEliminado)=>{
        if(err) return res.status(404).send({ report: 'Error en la petición' })
        if(userEliminado == null) return res.status(404).send({ report: 'No se borro el local'})

        return res.status(200).send(userEliminado)
    })
}

function listarXAño(req,res){
    var year = req.params.year;

    lugarModel.find({year:year},(err,lugarEncontrado)=>{
        if(err) return res.status(404).send({ report: 'Error en la petición' })
        if(lugarEncontrado == null) return res.status(404).send({ report: 'No se borro el local'})
        return res.status(200).send(lugarEncontrado);
    }).sort({local:1})
}

function listarXLugarAño(req,res){
    var lugar = req.params.lugar;
    var Year = req.params.Year;

    lugarModel.find({year:Year,local:lugar},(err,lugarEncontrado)=>{
        if(err) return res.status(404).send({ report: 'Error en la petición' })
        if(lugarEncontrado == null) return res.status(404).send({ report: 'No se borro el local'})
        return res.status(200).send(lugarEncontrado);
    }).sort({local:1})
}

function agregarCuota(req,res){
    var params = req.body
    var lugar = req.params.lugar;

    lugarModel.findOneAndUpdate({year:añoActual,local:lugar},
                                { $push: { cuotas: { cantidad: params.cantidad, fecha: fechaActual} } },
        {new: true}, (err,cuotaAgregada)=>{
            if(err) return res.status(404).send({report: 'Error en la petición'});
            if(!cuotaAgregada) return res.status(404).send({report: 'Error pagando'});
            var deuda= cuotaAgregada.debe-params.cantidad
            lugarModel.findByIdAndUpdate(cuotaAgregada._id,{debe:deuda},{new:true},(err,pagado)=>{
                if(pagado.debe == 0) cuotaTerminada(cuotaAgregada._id)
                return res.status(200).send(pagado);
            })
        })
}

async function cuotaTerminada(id){
    lugarModel.findByIdAndUpdate(id,{estado:'Terminado'},(err,cuotaCancelada)=>{
        
    })
}

function ListarLugarID(req,res){
    var id = req.params.id;

    lugarModel.findById(id, (err,lugarFound)=>{
        if(err) return res.status(404).send({report: 'Error en la petición'});
        if(!lugarFound) return res.status(404).send({report: 'Error buscando'});
        return res.status(200).send(lugarFound)
    })
}

module.exports = {
    crearLugar,
    modificar,
    eliminar,
    listarXAño,
    listarXLugarAño,
    agregarCuota,
    ListarLugarID
}