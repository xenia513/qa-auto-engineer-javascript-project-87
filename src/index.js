import parseFile from './parser.js'
import diffObjects from './diff.js'
import getFormatter from './formatters/index.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const diff = diffObjects(obj1, obj2)

  const formatter = getFormatter(format)
  return formatter(diff)
}

export default genDiff
