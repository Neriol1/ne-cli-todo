const { program } = require('commander')
const api = require('.')
const pkg = require('./package.json')

program.option('-x, --xxx', 'what the x')

program.version(pkg.version)

program
  .command('add')
  .description('add a task')
  .action((_, options) => {
    const keys = options.args
    api.add(keys[0])
  })

program
  .command('clear')
  .description('clear task')
  .action((...args) => {
    api.clear()
  })

program.parse(process.argv)

console.log(process.argv)
