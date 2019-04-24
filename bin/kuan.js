#!/usr/bin/env node

const program = require('commander')
const create = require('../lib')

program
  .version(require('../package').version, '-v, --version')
  .command('create <remote> <name>')
  .description('generate a project from a remote template (legacy API)')
  .action((remote, name) => {
    create(remote, name.replace(/[\/:]/g, '-'))
  })

program.command('test').action(() => {
  console.log('test success!')
})

program.parse(process.argv)

if (program.args.length < 1) return program.help()
