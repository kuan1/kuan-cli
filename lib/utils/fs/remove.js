const fs = require('fs')
const rimraf = require('rimraf').sync
const feedback = require('../feedback')

module.exports = async (dir = '') => {
  if (fs.existsSync(dir)) {
    const ok = await feedback.confirm(`${dir} is exists! should remove ?`)
    if (!ok) {
      return false
    }
    rimraf(dir)
    return true
  }
  return true
}
