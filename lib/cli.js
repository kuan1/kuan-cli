module.exports = {
  init(...args) {
    return require('./init')(...args)
  },
  genPkg() {
    return require('./gen-pkg')()
  },
}
