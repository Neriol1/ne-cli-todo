import db from '../db.js'
import {clearMock,setMockFile,mockFiles} from '../__mocks__/fs.js'

describe('db', () => {
  afterEach(() => {
    clearMock()
  })
  it('can read', async () => {
    const data = [{ title: 'task1', done: false }]
    setMockFile('/file1', JSON.stringify(data))
    const list = await db.read('/file1')
    expect(list).toStrictEqual(data)
  })
  it('can write',async ()=>{
    const data = [{title: 'task1', done: true}, {title: 'task2', done: true}]
    await db.write(data, '/file2')
    expect(mockFiles['/file2']).toBe(JSON.stringify(data) + '\n')
  })
  it('read and write correctly',async ()=>{
    const data = [{title: 'task1', done: true}]
    await db.write(data, '/file3')
    const result = await db.read('/file3')
    expect(result).toStrictEqual(data)
  })
})
