const runCmd = require('./utils/runCmd')
const { cyan } = require('chalk')
const ora = require('ora')

module.exports = async (cwd, executable = 'npm') => {
  const spinner = ora(`# ${cyan('Installing project dependencies ...')}`)
  spinner.start()
  await runCmd(executable, ['install'], {
    cwd
  })
  spinner.stop()
}
