#!/usr/bin/env node

import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 找到electron可执行文件的路径
const electronPath = require('electron')

// 运行electron，传递main.js作为参数
const child = spawn(electronPath, [path.join(__dirname, 'main.js')], {
  stdio: 'inherit'
})

child.on('close', (code) => {
  process.exit(code)
}) 