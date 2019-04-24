const Metalsmith = require('metalsmith')
const render = require('consolidate').handlebars.render
const ask = require('./ask')
const { getOptions } = require('./utils/util')
const logger = require('./utils/logger')
const autoInstall = require('./autoInstall')

/**
 * Generate a template given a `src` and `dest`.
 *
 * @param {String} name
 * @param {String} src
 */

module.exports = (name, temp) => {
  return new Promise((resolve, reject) => {
    const inPlace = name === '.'
    const destDirName = inPlace ? process.cwd() : `${process.cwd()}/${name}`
    const opts = getOptions(name, temp)
    const metalsmith = Metalsmith(`${temp}/template`)

    const data = Object.assign(metalsmith.metadata(), {
      ...metalsmith.metadata(),
      name: name || process.cwd(),
      destDirName,
      inPlace,
      noEscape: true
    })

    metalsmith.use(askQuestions(opts.prompts)).use(renderTemplateFiles(opts))

    metalsmith
      .clean(false)
      .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
      .destination(destDirName)
      .build(async err => {
        if (err) {
          reject(err)
        }
        resolve()
        if (data.autoInstall) {
          await autoInstall(destDirName, data.autoInstall)
        }
        logger.success('generate success!')
      })
    return data
  })
}

function askQuestions(prompts) {
  return (files, metalsmith, done) => {
    ask(prompts, metalsmith.metadata(), done)
  }
}

const renderItem = (str, data) => {
  return new Promise(resolve => {
    render(str, data, (err, res) => {
      if (err) {
        console.log('render error', err)
        resolve(`[${file}] ${err.message}`)
      } else {
        resolve(new Buffer(res))
      }
    })
  })
}
function renderTemplateFiles() {
  return async (files, metalsmith, done) => {
    const metalsmithMetadata = metalsmith.metadata()
    const keys = Object.keys(files)
    for (let i = 0; i < keys.length; i++) {
      const file = keys[i]
      const str = files[file].contents.toString()
      if (!/{{([^{}]+)}}/g.test(str)) {
        continue
      }
      files[file].contents = await renderItem(str, metalsmithMetadata)
    }
    done()
  }
}
