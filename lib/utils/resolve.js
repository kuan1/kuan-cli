const path = require('path')

const cwd = process.cwd()

const resolve = (...dir) => path.resolve(cwd, ...dir)

exports.CWD = cwd
exports.resolve = resolve
