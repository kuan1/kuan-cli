const path = require('path')
const gitClone = require('./utils/gitClone')
const transformFiles = require("./utils/transformFiles")
const { resolve, CWD } = require('./utils/resolve')

module.exports = async (options = {}) => {
  const { name, repository, branch, dir, platform, force } = options
  const projectName = path.basename(name === '.' ? CWD : name)
  await gitClone(repository, resolve(name), { dir, branch, force, platform, projectName })
}