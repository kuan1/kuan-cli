const feedback = require('./utils/feedback')
const download = require('./download')
const generate = require('./generate')
const resolve = require('./utils/resolve')
const { remove } = require('./utils/fs')

/**
 * Generate a template `name` from `remote`
 *
 * @param {String} remote 远程仓库
 * @param {String} name 当前仓库
 */
async function create(remote, name) {
  // 确认是否生成项目
  const url = `https://github.com/${remote}.git`
  const ok = await feedback.confirm(`create boilerplate ${name} from ${url}`)
  if (!ok) return false

  // 删除已有项目
  const isRemove = await remove(resolve(name))
  if (!isRemove) return

  // 临时下载文件夹
  const temp = resolve('.temp')

  await download(url, temp)

  // 生成项目
  await generate(name, temp)
}

// To exit with a 'failure' code
process.on('unhandledRejection', error => {
  console.error(error)
  process.exit(1)
})

module.exports = create
