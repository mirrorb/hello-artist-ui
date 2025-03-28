const { contextBridge, ipcRenderer } = require('electron')

// 将 Electron 的 API 暴露给渲染进程
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => {
      ipcRenderer.send(channel, data)
    },
    on: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  }
}) 