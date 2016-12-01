"use strict";

var loginCtrl = require('../controllers/loginCtrl');
var copyPasteCtrl = require('../controllers/copyPasteCtrl');

module.exports = function(app){

  //---------------------Page redirections----------------------------------------//
  app.get('/login', function(req, res){
    res.render('login', {});
  });
  app.get('/signup', function(req, res){
    res.render('signup', {});
  });
  app.get('/', function(req, res){
    res.render('index', {});
  });
  app.get('/clipboardhistory', function(req, res){
    res.render('templates/ClipboardHistory', {});
  });
  app.get('/search', function(req, res){
    res.render('templates/Search', {});
  });
  app.get('/favourites', function(req, res){
    res.render('templates/Favourites', {});
  });




  //-----------------------Handled by Controllers------------------------------------//
  app.post('/doLogin',loginCtrl.doLogin);
  app.post('/doSignup',loginCtrl.doSignup);
  app.get('/getHistory',copyPasteCtrl.getHistory);
  app.get('/getFav',copyPasteCtrl.getFav);
  app.post('/deleteHistory',copyPasteCtrl.deleteHistory);
  app.post('/favHistory',copyPasteCtrl.favHistory);
  app.post('/doLogout',loginCtrl.doLogout);
};
