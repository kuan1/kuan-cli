const rimraf = require('rimraf').sync
const git = require('./utils/git')
const { remove } = require('./utils/fs/index')

// git clone github repository
module.exports = async function download(url, temp) {
  const isRemove = await remove(temp)

  if (isRemove) {
    await git.clone(url, temp, '--depth', 1)
  }

  rimraf(`${temp}/.git`)
}
