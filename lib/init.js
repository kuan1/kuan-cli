const path = require("path")
const chalk = require("chalk")
const gitClone = require("./utils/gitClone")
const { resolve, CWD } = require('./utils/resolve')

module.exports = async (options = {}) => {
  const { name, repository, branch, dir, platform, force } = options
  const projectName = path.basename(name === '.' ? CWD : name)
  process.env.PROJECT_NAME = projectName
  const dest = resolve(name)
  if (!(await require("./utils/isEmptyDir")(dest))) {
    console.log(chalk.red(`请检查${projectName}文件夹不为空！`))
    process.exit(1)
  }
  // 下载模板
  await gitClone(repository, dest, { dir, branch, force, platform })
  // 转换ejs变量
  await require('./utils/transformFiles')(dest)
}