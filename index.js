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
