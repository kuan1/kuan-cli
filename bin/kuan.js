#!/usr/bin/env node

const program = require('commander')
const { create, git } = require('../src')

program
  .version(require('../package').version, '-v, --version')
  .command('create <remote> <name>')
  .description('generate a project from a remote template (legacy API)')
  .action((remote, name) => {
    create(remote, name.replace(/[\/:]/g, '-'))
  })

program.command('test').action(() => {
  const res = git.repository()
  console.log('remote repostory: ', res)
})

program.parse(process.argv)

if (program.args.length < 1) return program.help()
