import db from './db.js'
import inquirer from 'inquirer'
export const add = async (title) => {
  const list = await db.read()
  list.push({ title, done: false })
  await db.write(list)
}

export const clear = async () => {
  await db.write([])
}

const defaultOptions = [
  { name: 'create a task  ✨', value: '-2' },
  { name: 'exit  👋', value: '-1' },
]
const actions = [
  { name: 'mark as done  ✔', value: 'markAsDone' },
  { name: 'mark as undone   🔘', value: 'markAsUndone' },
  { name: 'update this title   🛠', value: 'updateTitle' },
  { name: 'remove  ⚡', value: 'remove' },
  { name: 'exit   👋', value: 'exit' },
]

const showTasks = async (list) => {
  const choices = list
    .map((item, index) => {
      return {
        name: `${item.title}  ${item.done ? '✔' : '🔘'}`,
        value: index.toString(),
      }
    })
    .concat(defaultOptions)
  return inquirer.prompt({
    type: 'list',
    name: 'index',
    message: 'choose a task',
    choices: choices,
  })
}
const markAsDone = async (list, index) => {
  list[index].done = true
  await db.write(list)
}
const markAsUndone = async (list, index) => {
  list[index].done = false
  await db.write(list)
}
const updateTitle = async (list, index) => {
  const { title } = await inquirer.prompt({
    type: 'input',
    name: 'title',
    message: 'enter a new title',
    default: list[index].title,
  })
  list[index].title = title
  await db.write(list)
}
const remove = async (list, index) => {
  list.splice(index, 1)
  await db.write(list)
}
const handleAction = async (action, list, index) => {
  const actionMap = { markAsDone, markAsUndone, updateTitle, remove }
  actionMap[action]?.(list, index)
}
const action = async (list, index) => {
  if (index >= 0) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'choose an action',
      choices: actions,
    })
    handleAction(action, list, index)
  } else if (index === '-2') {
    const { title } = await inquirer
      .prompt({
        type: 'input',
        name: 'title',
        message: 'enter a new title',
      })
      list.push({ title, done: false })
    db.write(list)
  }
}

export const showAll = async () => {
  const list = await db.read()
  const { index } = await showTasks(list)
  action(list, index)
}