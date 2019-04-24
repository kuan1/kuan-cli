const chalk = require('chalk')
const readline = require('readline')

const chalkTag = msg => chalk.bgBlackBright.white.dim(` ${msg} `)

const log = (msg, tag) =>
  console.log(tag ? `${chalkTag(tag)} ${msg}` : `${msg}`)

exports.log = log

exports.warn = (msg, tag) => log(chalk.yellow(msg), tag)

exports.error = (msg, tag) => log(chalk.red(msg), tag)

exports.info = (msg, tag) => log(chalk.cyan(msg), tag)

exports.success = (msg, tag) => log(chalk.green(msg), tag)

exports.clearConsole = title => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    if (title) {
      console.log(title)
    }
  }
}
