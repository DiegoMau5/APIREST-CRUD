'use strict'

// Definimos metodos para los middleware

var jwt = require('jwt-simple'); /// cargamos jwt
var moment = require('moment'); // cargamos moment sirve para la codificacion
var secret = 'clave_secreta_curso';

exports.ensureAuth = function(req,res,next){ //next para salir del middleware
// pasamos el header
  if (!req.headers.authorization) {
    return res.status(403).send({message:'La peteción no tiene la cabecera de autenticacion'});

  }

  var token = req.headers.authorization.replace(/['"]+/g,''); //eliminamos comillas si vienen en el token
  try {

    var payload = jwt.decode(token,secret);
    if (payload.exp <= moment().unix()) { // comprabamos que la fecha de expiración es atrasada a la actual
      return res.status(401).send({message:'token ha expirado'});
    }

  } catch (e) {
    
    return res.status(404).send({message:'token no valido'});
  }

  req.user = payload; // creamos objeto user y le pasamos todos los datos que viienen del usuario en payload
  next();
};
