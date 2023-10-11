import db from './db.js'
import inquirer from 'inquirer'
export const add = async title => {
  const list = await db.read()
  list.push({ title, done: false })
  await db.write(list)
}

export const clear = async () => {
  await db.write([])
}

export const showAll = async () => {
  console.log('show all');
  const mockData = [
    { title: 'x1', done: true },
    { title: 'x2', done: false },
    { title: 'x3', done: false },
  ]

  // const choices = mockData.map(v => ({ value: v.title, name: v.title, checked: v.done }))
  // const answer = await select({
  //   message: '',
  //   choices: [
  //     // { name: 'npm', value: 'npm' },
  //     // { name: 'yarn', value: 'yarn', checked: true },
  //     // { name: 'pnpm', value: 'pnpm' },
  //     // {
  //     //   name: 'pnpm',
  //     //   value: 'pnpm',
  //     //   disabled: '(pnpm is not available)',
  //     // },
  //     ...choices,
  //     new Separator(),
  //   ],
  // });
  // console.log(answer);
  // <boolean, { message: string; default?: boolean }>
}