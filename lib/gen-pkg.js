const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const chalk = require('chalk')

const pkgPath = path.resolve(process.cwd(), 'package.json')

const getDefaultPkg = () => {
  return fs.pathExistsSync(pkgPath) ? fs.readJsonSync(pkgPath) : {}
}

const getPkg = (options = {}) => {
  const pkg = {
    name: options.name,
    version: '1.0.0',
    description: options.description,
    author: options.author || 'kuan1',
    license: 'MIT',
    repository: {
      type: 'git',
      url: `git+https://github.com/${options.repository}.git`,
    },
    homepage: `https://github.com/${options.repository}#readme`,
    bugs: {
      url: `https://github.com/${options.repository}/issues`,
    },
  }
  if (!options.repository) {
    delete pkg.bugs
    delete pkg.repository
    delete pkg.bugs
  }
  return pkg
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message: '请输入项目英文名称',
    default: path.basename(process.cwd()),
    validate: (t) => (t ? true : '请输入'),
  },
  {
    type: 'input',
    name: 'author',
    message: '请输入作者',
    default: 'kuan1',
    validate: (t) => (t ? true : '请输入'),
  },
  {
    type: 'input',
    name: 'description',
    message: '请输入项目描述',
    default: '没有描述',
    validate: (t) => (t ? true : '请输入'),
  },
  {
    type: 'input',
    name: 'repository',
    message: '请输入github仓库名称',
  },
]

const startGenPkg = async () => {
  const options = await inquirer.prompt(questions)
  const pkg = { ...getDefaultPkg(), ...getPkg(options) }
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8')
  console.log(chalk.green('generate package.json success!'))
}

module.exports = startGenPkg
