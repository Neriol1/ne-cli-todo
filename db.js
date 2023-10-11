import os from 'os'
import path from 'path'
import fs from 'fs'
const homedir = os.homedir()
const home = process.env.HOME || homedir


const dbPath = path.join(home, '.todo')
const db = {
  read(path = dbPath) {
    return new Promise((reslove, reject) => {
      fs.readFile(path, { flag: 'a+' }, (err, data) => {
        if (err) {
          return reject(err)
        }
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error) {
          list = []
        }
        reslove(list)
      })
    })
  },
  write(list, path = dbPath) {
    return new Promise((reslove, reject) => {
      const str = JSON.stringify(list)
      fs.writeFile(path, str + '\n', err => {
        if (err) {
          return reject(err)
        }
        reslove()
      })
    })
  },
}

export default db