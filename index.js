'use strict'

var mongoose = require('mongoose'); // Carga del modulo
var app = require('./app'); // cargamos app

var port = process.env.PORT || 3977; // PUerto servidor WEB

mongoose.connect('mongodb://localhost:27017/curso_mean', (err,res)=>{

  if(err){
    throw err;
  }else {
    console.log("La conexion a la BBDD es correcta... ");
    app.listen(port,function(){
      console.log("Servidor corriendo...");
    }); // activar
  }
}); // Conexion BBDD , funcion Callback respuesta error.
