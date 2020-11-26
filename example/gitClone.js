const gitClone = require('../lib/utils/gitClone')

gitClone('https://gitee.com/zhongkuan/kuan-boilerplate.git', 'dist/aa', { branch: 'dev', dir: 'rollup-typescript', force: false })