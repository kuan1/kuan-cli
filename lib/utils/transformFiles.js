const path = require('path')
const fs = require('fs-extra')
const ejs = require('ejs')
const readFiles = require("./readFiles")
const prompt = require("./prompt")

async function getCustomPrompt(dest, answer = {}) {
  const customPromptPath = path.resolve(dest, 'prompt.js')
  if (!fs.pathExistsSync) return {}
  const cpt = require(customPromptPath)
  const questions = typeof cpt === 'function' ? (await cpt(answer)) : cpt
  return Array.isArray(questions) ? (await prompt(questions)) : {}
}

module.exports = async (dest, answer = {}) => {
  // 默认问题
  const defaultAnswer = await prompt()
  // 自定义问题
  const customerAnswer = await getCustomPrompt(dest, answer)
  Object.assign(answer, defaultAnswer, customerAnswer)

  // 根据回答更新模板
  const files = await readFiles(dest)
  Object.keys(files).forEach(filePath => {
    const content = files[filePath]
    const newContent = ejs.render(content, answer)
    if (content !== newContent) {
      fs.writeFileSync(path.resolve(dest, filePath), newContent, 'utf-8')
    }
  })
}