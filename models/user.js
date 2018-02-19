'use strict'

var mongoose = require('mongoose'); // importamos mongoose
var Schema = mongoose.Schema; // NOs permite definir los esquemas de la bbdd


var UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  rol: String,
  image: String
}); // mongo añade id automatico.

module.exports = mongoose.model('User', UserSchema); // exportamos el modelo
