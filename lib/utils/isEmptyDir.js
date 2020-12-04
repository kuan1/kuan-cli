const path = require('path')
const fs = require('fs-extra')
const prompt = require('./prompt')

// 是否空问文件夹或者空git文件夹
const isEmptyDir = (dir) => {
  if (!fs.pathExistsSync(dir)) return true
  if (fs.statSync(dir).isFile()) return false
  const files = fs.readdirSync(dir).filter(item => item !== '.git')
  return files.length === 0
}

module.exports = async (dest) => {
  let isEmpty = isEmptyDir(dest)
  if (!isEmpty) {
    const { shouldClean } = await prompt([
      {
        type: 'confirm',
        name: 'shouldClean',
        message: `是否要清空${path.basename(dest)}?`,
      },
    ])
    if (shouldClean) {
      await fs.ensureDir(dest)
      await fs.emptyDir(dest)
      isEmpty = true
    }
  }
  return isEmpty
}