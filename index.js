"use strict";

var express = require('express');
var expApp = express();
var http = require('http').Server(expApp);
var path = require('path');
var bodyParser = require('body-parser');

// all environments
expApp.set('port', process.env.PORT || 3000);
expApp.set('views', __dirname + '/views');
expApp.set('view engine', 'ejs');
expApp.use(bodyParser.urlencoded({ extended: true }));
expApp.use(bodyParser.json());
expApp.use(express.static(path.join(__dirname, 'public')));

//----------------ROUTES--------------------------//
//require("./routes/route.js")(expApp);

http.listen(expApp.get('port'), function(){
	console.log('Node-Server listening on port ' + expApp.get('port'));
});


//------------------Electron-------------------------------------------//
const {app, Menu, Tray, BrowserWindow, clipboard, globalShortcut,window} = require('electron');

app.on('ready', function(){
const win = new BrowserWindow({width: 450, height: 700, center:true,titleBarStyle: 'hidden',frame: true,titleBarStyle: 'hidden',show:false})
const tray = new Tray('node-changed.png')

win.loadURL('http://localhost:3000/login/');

// This is code for Copy paste
  const copy = globalShortcut.register('CommandOrControl+Shift+C', () => {
    console.log('CommandOrControl+C is pressed');
    var temp = clipboard.readText();
    console.log(temp);
    // Code to sync things goes here
  });

// This is code for Copy paste
  const cut = globalShortcut.register('CommandOrControl+Shift+X', () => {
    console.log('CommandOrControl+X is pressed');
    // Code to sync things goes here
  }); 

// This is code for Copy paste
  const paste = globalShortcut.register('CommandOrControl+Shift+V', () => {
    console.log('CommandOrControl+V is pressed');
    // Code to sync things goes here
  });  




tray.on('click', function() {
   win.isVisible() ? win.hide() : win.show()
})
win.on('show', () => {
  tray.setHighlightMode('always')
})
win.on('hide', () => {
  tray.setHighlightMode('never')
})

});
