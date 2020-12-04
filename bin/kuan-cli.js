#!/usr/bin/env node
const program = require('commander')
const cli = require('../lib/cli')

program
  .version(require('../package').version, '-v, --version')

/**
 * 快速创建模板
 * kuan-cli init . -r zhongkuan/kuan-boilerplate -b master -d rollup-ts
 * kuan-cli init . -r https://gitee.com/zhongkuan/kuan-boilerplate.git -b master -d rollup-ts
 */
program
  .command('init <app-name>')
  .description('ejs模板快速创建项目')
  .option('-r, --repository <repository>', 'github/gitee仓库名称', 'zhongkuan/kuan-boilerplate')
  .option('-b, --branch <branch-name>', '仓库分支名称')
  .option('-d, --dir <dir>', '二级目录')
  .option('-p, --platform <gitee|github>', 'gitee或者github', 'gitee')
  .option('-f, --force', '是否删除缓存，强制更新', true)
  .action((appName, options) => {
    const name = appName.replace(/[\/:]/g, '-')
    const { repository = '', branch = '', dir = '', platform = '', force = false } = options
    cli.init({ name, repository, branch, dir, platform, force })
  })

program
  .command('test')
  .description('test-test')
  .action(() => {
    console.log('test success!')
  })

program.parse(process.argv)

