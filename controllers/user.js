// COntrolador de usuario


'use strict'
var bcrypt = require('bcrypt-nodejs'); // importamos bcrypt
var User = require('../models/user'); // importamos modelo
var jwt = require('../services/jwt'); // importamos servicio
var fs = require('fs');
var path = require('path'); // utilizamos para el sistema de ficheros del sistema con ayudas para el path

function pruebas(req,res){
   res.status(200).send({
     message: 'Probando controlador'
   });
}

function saveUser(req,res){
  var user = new User(); // COnstructor
  var params = req.body; // recogemos los parametros por post
  console.log(params);
  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.rol = 'role_user';
  user.image = 'null';

  if(params.password){
    // ENcriptar
    bcrypt.hash(params.password,null,null, function(err,hash){
      user.password = hash;
      if(user.name != null && user.email != null){
        //guardamos
        user.save((err, userStored)=>{
          if (err) {
            res.status(500).send({message: 'error al guardar el usuario'});
          }else {
            if (!userStored) {
              res.status(404).send({message: 'No se ha podido registrar el usuario'}); // no existe
            }else {
              res.status(200).send({user: userStored}); // objeto con los datos del usuario
            }
          }
        });
      }else {
        res.status(200).send({message: 'Intoduce email o nombre'});
      }
    });
  }else {
    res.status(200).send({message: 'Intoduce la contraseña'}); // error
  }
}

function loginUser(req, res){
  var params = req.body;

  var email = params.email;
  var password  = params.password;

  User.findOne({email: email},(err,user)=>{ // buscamos el email en la bbdd
    if (err) {
      res.status(500).send({message:'error en la peticion'});
    }else{
      if (!user) {
        res.status(404).send({message:'Usuario no existe'});
      }else{
        //comparamos pass
        bcrypt.compare(password, user.password, (err,check)=> { // comparamos pssword que viene con la de la base de datos del usuario
          if (check) {
            // devolver datos del usuario logueado
            if (params.gethash) {
              // devolver un token de jwt -> usamos el servicio
              res.status(200).send({
                token: jwt.createToken(user)
              });
            }else{
              res.status(200).send({user});
            }
          }else{
            res.status(404).send({message:'EL usuario no ha podido loguearse'});
          }
        });
      }
    }
  });
}

function getImageFile(req, res){
  var imageFile = req.params.imageFile; // recogemos parametro imagen por parametro

  var pathFile = './uploads/users/'+imageFile; // INdicamos la ruta donde buscar

  fs.exists(pathFile, function(exists){ // buscamos la imagen en la carpeta de users
    if (exists) {

      res.sendFile(path.resolve(pathFile))
    }else {
      res.status(200).send({message: 'La imagen no existe...'});
    }
  });
}

function updateUser(req,res){
  var userId = req.params.id;
  var update = req.body;

  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) {
      res.status(500).send({message:'erro al actualizar'});
    }else{
      if (!userUpdated) {
        res.status(404).send({message:'NO se ha podido actualizar el usuario'});
      }else {
        res.status(200).send({user:userUpdated});
      }
    }
  });
}

function uploadImage(req, res){
  var userId = req.params.id;
  var file_name = 'No subido';

  if (req.files) {
    var file_path = req.files.image.path;
    var file_split = file_path.split("/");
    var file_name = file_split[2];

    var ext_split = file_name.split('.');
    var file_ext = ext_split[1];


    if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') { // COmprobamos que es una imgagen. y Actualizamos
      User.findByIdAndUpdate(userId, {image:file_name}, (err, userUpdated) => {
        if (err) {
          res.status(500).send({message:'error al actualizar'});
        }else{
          if (!userUpdated) {
            res.status(404).send({message:'NO se ha podido actualizar el usuario'});
          }else {
            res.status(200).send({user:userUpdated});
          }
        }

      });
    }else {
      res.status(200).send({message:'Extension no valida'});
    }

    //console.log(file_name);
  }else{
    res.status(200).send({message:'no ha subido ninguna imagen'});
  }
}

function removeUser(req, res){
  var userId = req.params.id;
  var remove = req.body;

  User.findByIdAndRemove(userId,remove, (err,artistRemoved)=>{
    if (err) {
      res.status(500).send({message:'error en la peticion'});
    }
    else{
      if (!artistRemoved) {
        res.status(404).send({message:'El artista no se puede borrar'});
      }else{
        res.status(200).send({artist:artistRemoved});
      }
    }
  });
}

module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile,
  removeUser
};
