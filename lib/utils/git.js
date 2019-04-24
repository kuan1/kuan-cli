const exec = require('child_process').execSync
const ora = require('ora')
const chalk = require('chalk')
const runCmd = require('./runCmd')

const git = {
  async clone(url, ...args) {
    const spinner = ora(chalk.cyan(`git clone ${url} ${args.join(' ')} \n `))
    spinner.start()
    const res = await runCmd('git', ['clone', url, ...args])
    spinner.stop()
    return res
  },
  async pull(...args) {
    const spinner = ora(`git pull ${args.join(' ')}... \n `)
    spinner.start()
    const res = await runCmd('git', ['pull', ...args])
    spinner.stop()
    return res
  },
  async push(...args) {
    const spinner = ora(`git push ${args}... \n `)
    spinner.start()
    const res = await runCmd('git', ['push', ...args])
    spinner.stop()
    return res
  },
  user() {
    let name
    let email
    try {
      name = exec('git config --get user.name')
      email = exec('git config --get user.email')
    } catch (e) {}

    name = name && JSON.stringify(name.toString().trim()).slice(1, -1)
    email = email && ' <' + email.toString().trim() + '>'
    return (name || '') + (email || '')
  },
  repository() {
    let res
    let repository
    try {
      res = exec('git remote -v').toString()
    } catch (e) {}
    if (res) {
      repository = res
        .split('\n')[1]
        .replace('origin\t', '')
        .replace(' (push)', '')
    }
    return repository
  }
}

module.exports = git
