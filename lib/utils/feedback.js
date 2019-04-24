const inquirer = require('inquirer')

/**
 * 确认
 * @return {Promise}
 */
exports.confirm = async (message = 'are you confirm ?') => {
  const { ok } = await inquirer.prompt([
    {
      type: 'confirm',
      message,
      name: 'ok'
    }
  ])
  return ok
}

/**
 * 选择
 * @return {Promise}
 */
exports.select = async (
  name = '',
  key = '',
  label = '',
  message = '',
  choices = ['选项1', '选项2', '选项3']
) => {
  const res = await inquirer.prompt({
    name: name || key || '请选择',
    message: message || label || key,
    type: 'list',
    choices
  })
  return res
}

/**
 * 输入
 * @params {String} message 标题
 * @params {String} defaultValue 默认输入
 * @return {Promise}
 */
exports.input = async (message, defaultValue) => {
  const data = await inquirer.prompt({
    type: 'string',
    name: message,
    required: true,
    message: message,
    default: defaultValue
  })
  return Object.values(data)[0]
}
