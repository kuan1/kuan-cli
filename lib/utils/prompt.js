const path = require('path')
const inquirer = require("inquirer")

const defaultName = process.env.PROJECT_NAME || path.basename(process.cwd())

const defaultQuestions = [
  {
    type: 'input',
    name: 'name',
    message: '请输入项目英文名称',
    default: defaultName,
    validate: (t) => t ? true : '请输入'
  },
  {
    type: 'input',
    name: 'title',
    message: '请输入项目中文名称',
    default: defaultName,
    validate: (t) => t ? true : '请输入'
  },
  {
    type: 'input',
    name: 'description',
    message: '请输入项目描述',
    default: '没有描述',
    validate: (t) => t ? true : '请输入'
  },
]

module.exports = (questions = defaultQuestions) => {
  return inquirer.prompt(questions)
}
