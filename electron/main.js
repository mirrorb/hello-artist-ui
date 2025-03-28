import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import isDev from 'electron-is-dev'

// ES模块中获取__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // 加载应用
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:5173' // Vite 默认开发服务器地址
      : `file://${path.join(__dirname, '../frontend/dist/index.html')}`
  )

  // 在开发环境下打开开发者工具
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // 在 macOS 中，当点击 dock 图标并且没有其他窗口打开时，
    // 通常会在应用程序中重新创建一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口关闭时退出应用
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
}) 