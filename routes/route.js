"use strict";

var loginCtrl = require('../controllers/loginCtrl');

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('login', {});
  });

  app.post('/doLogin',loginCtrl.doLogin);
};

