'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const userModel = require("../models/user.model");

const administrador ='Administrador'
const usuario = 'User';

function Login(req, res) {
    var params = req.body;
  
    userModel.findOne({ nickName: params.nickName }, (err, userFound) => {
      if (err) return res.status(404).send({ report: 'Error at Login' });
  
      if (!userFound) return res.status(404).send({ report: 'user dosent exist' });
  
      if (userFound) {
  
        bcrypt.compare(params.password, userFound.password, (err, Valid) => {
  
          if (err) return res.status(404).send({ report: 'Error in password' });
  
          if (Valid) {
  
            return res.status(200).send({ token: jwt.createToken(userFound), userFound });
  
          } else {
  
            return res.status(404).send({ report: 'The user its not valid' })
  
          }
        })
      }
    })
  
  }
  

  module.exports ={
      Login
  }