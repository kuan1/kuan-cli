const inquirer = require("inquirer")

const defaultQuestions = [
  {
    type: 'input',
    name: 'name',
    message: '请输入项目英文名称',
    default: 'kuan-cli-template',
    validate: (t) => t ? true : '请输入'
  },
  {
    type: 'input',
    name: 'title',
    message: '请输入项目中文名称',
    default: 'kuan-cli 模板',
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
