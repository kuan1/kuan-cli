const path = require('path')
const fs = require('fs')
const { green, yellow } = require('chalk')
const git = require('./git')

/**
 *  成功之后打印
 * @param {Object} data
 */
exports.printMessage = function printMessage(data) {
  const installMessage = !data.autoInstall
    ? 'npm install (or if using yarn: yarn)\n '
    : ''
  const dest = data.inPlace ? '' : `cd ${data.destDirName}\n `
  const message = `
# ${green('Project initialization finished!')}
# ========================
To get started:
  ${yellow(`${dest}${installMessage}npm run dev`)}
`
  console.log(message)
}

/**
 * 获取 prompts metadata
 * @param  {String} name
 * @param  {String} dir
 * @return {Object}
 */
exports.getOptions = (name, dir) => {
  const opts = getMetadata(dir)
  setDefault(opts, 'name', name)
  const author = git.user()
  if (author) {
    setDefault(opts, 'author', author)
  }
  return opts
}

/**
 * 设置meta.json中的prompts
 *
 * @param {Object} opts
 * @param {String} key
 * @param {String} val
 */
function setDefault(opts, key, val) {
  const prompts = opts.prompts || (opts.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      type: 'string',
      default: val
    }
  } else {
    prompts[key]['default'] = val
  }
}

/**
 * Gets the metadata from either a meta.json or meta.js file.
 *
 * @param  {String} dir
 * @return {Object}
 */
function getMetadata(dir) {
  const js = path.join(dir, 'meta.js')

  if (fs.existsSync(js)) {
    return require(js)
  }
  throw new Error(`${js} is Not Found`)
}
