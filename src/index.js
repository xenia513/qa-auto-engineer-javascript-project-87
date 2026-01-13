import fs from 'node:fs'
import path from 'node:path'
import parse from './parser.js'
import compareData from './diff.js'
import format from './formatters/index.js'

const getFullPath = filepath => path.resolve(filepath)
const extractFormat = filepath => path.extname(filepath).slice(1).toLowerCase()
const readContent = fullpath => fs.readFileSync(fullpath, 'utf-8')

const getData = (filepath) => {
  const fullpath = getFullPath(filepath)
  const inputFormat = extractFormat(filepath)
  const content = readContent(fullpath)
  return parse(content, inputFormat)
}

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)
  const diff = compareData(data1, data2)

  return format(diff, outputFormat)
}

export default genDiff
