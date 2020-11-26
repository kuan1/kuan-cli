const path = require('path')
const cwd = process.cwd()

exports.CWD = cwd
exports.KUAN_CLI_DEST = process.env.KUAN_CLI_DEST || path.resolve(cwd, 'kuan-cli-template')

