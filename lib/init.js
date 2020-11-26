const path = require('path')
const chalk = require("chalk")
const gitClone = require('./utils/gitClone')
const isEmptyDir = require("./utils/isEmptyDir")
const { resolve, CWD } = require('./utils/resolve')
const transformFiles = require('./utils/transformFiles')

module.exports = async (options = {}) => {
  const { name, repository, branch, dir, platform, force } = options
  const projectName = path.basename(name === '.' ? CWD : name)
  const dest = resolve(name)
  if (!(await isEmptyDir(dest))) {
    console.log(chalk.red(`请检查${projectName}文件夹不为空！`))
    process.exit(1)
  }
  // 下载模板
  await gitClone(repository, dest, { dir, branch, force, platform, projectName })
  // 转换ejs变量
  await transformFiles(dest, { name: projectName })
}