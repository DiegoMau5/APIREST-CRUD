'use strict'

var jwt = require('jwt-simple'); /// cargamos jwt
var moment = require('moment'); // cargamos moment sirve para la codificacion
var secret = 'clave_secreta_curso';

exports.createToken = function (user){
  //Pasamos el usuario que queremos codificar.
  var payload = {
    // datos que se van a codificar
    sub:user.id,
    name:user.name,
    surname: user.surname,
    email:user.email,
    rol: user.rol,
    image: user.image,
    iat: moment().unix(), // sacamos fecha actul creacion
    exp: moment().add(30,'days').unix() // fecha de expiracion

  };

  return jwt.encode(payload, secret); //secret = clave secreta para generar el hash
};
