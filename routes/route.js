"use strict";

var loginCtrl = require('../controllers/loginCtrl');

module.exports = function(app){

  //---------------------Page redirections----------------------------------------//
  app.get('/login', function(req, res){
    res.render('login', {});
  });
  app.get('/', function(req, res){
    res.render('index', {});
  });
  app.get('/clipboardhistory', function(req, res){
    res.render('templates/clipboardhistory', {});
  });
  app.get('/favourites', function(req, res){
    res.render('templates/favourites', {});
  });




  //-----------------------Handled by Controllers------------------------------------//
  app.post('/doLogin',loginCtrl.doLogin);


};
