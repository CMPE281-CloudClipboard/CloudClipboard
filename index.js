const {app, Menu, Tray, BrowserWindow, clipboard, globalShortcut,window} = require('electron');


app.on('ready', () => {
const win = new BrowserWindow({width: 800, height: 600, center:true,titleBarStyle: 'hidden',frame: false,titleBarStyle: 'hidden',show:false})
const tray = new Tray('node-changed.png')

win.loadURL('http://localhost:3000');


tray.on('click', () => {
   win.isVisible() ? win.hide() : win.show()
})
win.on('show', () => {
  tray.setHighlightMode('always')
})
win.on('hide', () => {
  tray.setHighlightMode('never')
})

});

