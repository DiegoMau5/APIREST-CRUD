'use strict'

var express = require('express'); // cargamos libreria express
var bodyParser = require('body-parser'); // cargamos body parser

var app = express(); // creamos objeto express

// ---- SE cargaran las rutas

var user_routes = require('./routes/user');


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); // COnfiguracion bodyParser

// CONFGIGURACION CABECERAS HTTP

//RUTAS BASE
app.use('/api', user_routes); // ruta base middleware


module.exports = app;
