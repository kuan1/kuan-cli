const fs = require('fs-extra')

// 是否空问文件夹或者空git文件夹
module.exports = (dest) => {
  console.log(dest)
  if (!fs.pathExistsSync(dest)) return true
  if (fs.statSync(dest).isFile()) return false
  const files = fs.readdirSync(dest).filter(item => item !== '.git')
  return files.length === 0
}