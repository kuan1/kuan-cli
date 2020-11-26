const fs = require('fs')
const ejs = require('ejs')
const readFiles = require("./readFiles")
const { KUAN_CLI_DEST } = require('../constant')

module.exports = (dest = KUAN_CLI_DEST, answer = {}) => {
  return readFiles(dest).then(files => {
    Object.keys(filePath => {
      const content = files[filePath]
      fs.writeFileSync(filePath, ejs.render(content, answer), 'utf-8')
    })
  })
}