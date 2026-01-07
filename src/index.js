import parseFile from './parser.js'

const buildDiff = (data1, data2) => {
  const allKeys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])]
  const sortedKeys = [...allKeys].sort()

  const diffLines = sortedKeys.map(key => {
    if (!(key in data1)) {
      return `  + ${key}: ${data2[key]}`
    }
    if (!(key in data2)) {
      return `  - ${key}: ${data1[key]}`
    }
    if (data1[key] !== data2[key]) {
      return [
        `  - ${key}: ${data1[key]}`,
        `  + ${key}: ${data2[key]}`
      ].join('\n');
    }
    return `    ${key}: ${data1[key]}`
  })
  return `{\n${diffLines.join('\n')}\n}`
}

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  return buildDiff(data1, data2)
}


export default genDiff