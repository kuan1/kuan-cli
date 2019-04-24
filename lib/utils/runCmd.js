const spawn = require('child_process').spawn
const logger = require('./logger')

function runCmd(cmd, args, options = {}) {
  const finalOptions = {
    cwd: process.cwd(),
    ...options
  }
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, finalOptions)
    let resp = ''
    child.stdout.on('data', buffer => {
      resp += buffer.toString()
    })
    child.stdout.pipe(process.stdout)
    child.on('close', status => {
      if (status == 0) {
        logger.success('exec success!')
        // logger.succes1s(resp)
        resolve(resp)
      } else {
        logger.error(`exec error: ${status}!`)
        reject(resp)
      }
    })
  })
}

module.exports = runCmd
