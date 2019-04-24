const path = require('path')

const cwd = process.cwd()

// 根目录路径
function resolve(...dir) {
  return path.resolve(cwd, ...dir)
}

module.exports = resolve