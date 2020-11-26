const path = require('path')
const gitClone = require('./utils/gitClone')
const transformFiles = require("./utils/transformFiles")

module.exports = (options = {}) => {
  const { name, repository, branch, dir, platform, force } = options
  const dest = name === '.' ? path.basename(process.cwd()) : name
  await gitClone(repository, dest, { dir, branch, force, platform })
}