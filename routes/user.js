'use strict'

// cargamos express

var express = require('express');
var UserController = require('../controllers/user'); // cargamos COntrolador



var api = express.Router();
var md_auth = require('../middleware/authenticate'); // importams el middleware

var multipart = require('connect-multiparty'); // subir fichero http
var md_upload = multipart({uploadDir:'./uploads/users'}); // creamos fichero de almacen de imagenes usuarios

api.get('/probando', md_auth.ensureAuth , UserController.pruebas); // asociamos ruta a un metodo
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id',md_auth.ensureAuth, UserController.updateUser);
api.delete('/remove-user/:id',md_auth.ensureAuth, UserController.removeUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
module.exports = api ;
