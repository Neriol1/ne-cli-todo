#!/usr/bin/env node
import { program } from 'commander'
import * as api from './index.js'
import { readFile } from 'fs/promises';
const pkg = JSON.parse(
  await readFile(
    new URL('./package.json', import.meta.url)
  )
);

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
