#!/usr/bin/env node
const { program } = require('commander')
const api = require('.')
const pkg = require('./package.json')

program.version(pkg.version)

program
  .command('add')
  .description('add a task')
  .action((name, options, command) => {
    const keys = options.args
    api.add(keys[0])
  })

program
  .command('clear')
  .description('clear task')
  .action((...args) => {
    api.clear()
  })

if (process.argv.length === 2) {
  void api.showAll()
} else {
  program.parse(process.argv)
}
