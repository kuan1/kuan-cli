const inquirer = require('inquirer')

/**
 * Ask questions, return results.
 *
 * @param {Object} prompts
 * @param {Object} data
 * @param {Function} done
 */
module.exports = async (prompts, data, done) => {
  const keys = Object.keys(prompts)
  for (let i = 1; i < keys.length; i++) {
    const key = keys[i]
    await prompt(data, key, prompts[key])
  }
  done()
}

const promptMapping = {
  string: 'input',
  boolean: 'confirm'
}
/**
 * Inquirer prompt wrapper.
 *
 * @param {Object} data
 * @param {String} key
 * @param {Object} prompt
 * @param {Function} done
 */
function prompt(data, key, prompt) {
  return new Promise(resolve => {
    let promptDefault = prompt.default

    inquirer
      .prompt([
        {
          type: promptMapping[prompt.type] || prompt.type,
          name: key,
          message: prompt.message || prompt.label || key,
          default: promptDefault,
          choices: prompt.choices || [],
          validate: prompt.validate || (() => true)
        }
      ])
      .then(answers => {
        if (Array.isArray(answers[key])) {
          data[key] = {}
          answers[key].forEach(multiChoiceAnswer => {
            data[key][multiChoiceAnswer] = true
          })
        } else if (typeof answers[key] === 'string') {
          data[key] = answers[key].replace(/"/g, '\\"')
        } else {
          data[key] = answers[key]
        }
        resolve()
      })
      .catch(resolve)
  })
}
