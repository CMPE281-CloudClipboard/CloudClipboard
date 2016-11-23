const {app, Menu, Tray, BrowserWindow, clipboard, globalShortcut,window} = require('electron');


app.on('ready', function(){
const win = new BrowserWindow({width: 800, height: 600, center:true,titleBarStyle: 'hidden',frame: true,titleBarStyle: 'hidden',show:false})
const tray = new Tray('node-changed.png')

win.loadURL('./views/login.html');


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


var express = require('express')
	,expressApp = express()
  , http = require('http').Server(expressApp)
  , path = require('path')
  , test = require("./routes/test");
var bodyParser = require('body-parser');
// all environments
expressApp.set('port', process.env.PORT || 3000);
expressApp.set('views', __dirname + '/views');
expressApp.set('view engine', 'ejs');
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());
expressApp.use(express.static(path.join(__dirname, 'public')));


expressApp.get('/test', test.basicTesting);

http.listen(expressApp.get('port'), function(){
	console.log('AmazonFresh Node-Server listening on port ' + expressApp.get('port'));
});
