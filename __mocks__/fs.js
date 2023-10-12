import { jest } from '@jest/globals'
import fs from 'fs'

let mockFiles = {}
const setMockFile = (path, data) => {
  mockFiles[path] = data
}

jest.spyOn(fs, 'readFile').mockImplementation((path, options, callback) => {
  if (callback === undefined) {
    callback = options
  }
  if (path in mockFiles) {
    callback(null, mockFiles[path])
  }
})

jest.spyOn(fs,'writeFile').mockImplementation((path, data, options, callback) => {
  if (callback === undefined) {
    callback = options
  }
  mockFiles[path] = data
  callback()
})

const clearMock = () => {
  mockFiles = {}
}

export {
  setMockFile,
  clearMock,
  mockFiles
}