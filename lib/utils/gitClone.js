/**
 * 部分代码来自：
 * https://www.npmjs.com/package/git-clone
 */
const path = require('path')
const ora = require("ora")
const chalk = require('chalk')
const { spawn } = require('child_process')
const os = require("os")
const fs = require("fs-extra")

const spinner = ora()

function getGitUrl(repository, platform) {
  if (/\.git$/.test(repository)) return repository
  if (platform === 'gitee') return `https://gitee.com/${repository}.git`
  if (platform === 'github') return `https://github.com/${repository}.git`
}

function gitClone(repo, dest, opts) {
  opts = opts || {}

  const git = opts.git || 'git'
  const args = ['clone']

  args.push(repo)

  args.push(dest)

  if (opts.branch) {
    args.push('-b')
    args.push(opts.branch)
  }

  if (opts.shallow) {
    args.push('--depth')
    args.push('1')
  }

  console.log(chalk.gray(`${git} ${args.join(' ')}`))
  spinner.start(repo)

  return new Promise((resolve, reject) => {
    const process = spawn(git, args)
    process.on('close', function (status) {
      if (status == 0) {
        resolve(status)
      } else {
        reject(new Error("'git clone' failed with status " + status))
      }
    })
  })
}

module.exports = async (repository, dest, options = {}) => {
  const { dir = '', branch, force = false, platform } = options
  const opts = {
    force: false,
    branch,
    shallow: true,
  }
  const repo = getGitUrl(repository, platform)
  const repoName = (repo.match(/([^/]*?)\.git$/) || [_, 'temp'])[1]
  const tempDest = path.resolve(os.tmpdir(), 'kuan_cli', repoName)

  if (fs.pathExistsSync(tempDest)) {
    if (force) {
      await fs.remove(tempDest)
      await gitClone(repo, tempDest, opts)
    }
  } else {
    await gitClone(repo, tempDest, opts)
  }
  const sourcePath = path.resolve(tempDest, dir)
  fs.copySync(sourcePath, dest, { overwrite: true })
  spinner.stopAndPersist({
    symbol: chalk.green('✔'),
    text: '模板下载完成!'
  })
  console.log()
}