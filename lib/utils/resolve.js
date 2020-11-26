const fs = require('fs-extra')
const path = require('path')

const reoslveApp = (...dir) => path.resolve(APP_PATH, ...dir)

exports.resolveAppPkg = () => {
  const pkgPath = reoslveApp('package.json')
  return fs.pathExistsSync(pkgPath) ? require(pkgPath) : { name: 'kuan-cli-template' }
}
