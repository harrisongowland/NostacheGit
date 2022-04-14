const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    process: (path, fileName, targetPath) => ipcRenderer.send('process', path, fileName, targetPath),
    storeData: (channel, func) => {
        ipcRenderer.on(channel, func);
    },
    storeFrame: (channel, func) => {
        ipcRenderer.on(channel, func);
    },
    getDirectory: () => {
        ipcRenderer.send('getDirectory')
    },
    receivepath: (channel, func) => {
        ipcRenderer.on(channel, func)
    }
});