import fs from 'node:fs'
import path from 'node:path'
import jsYaml from 'js-yaml'

const readFile = (filepath) => {
  const absolutePath = path.resolve(filepath)
  return fs.readFileSync(absolutePath, 'utf-8')
}

const parseJson = content => JSON.parse(content)
const parseYaml = content => jsYaml.load(content)

const getParser = (filepath) => {
  const ext = path.extname(filepath).toLowerCase()
  switch (ext) {
    case '.json':
      return parseJson
    case '.yml':
    case '.yaml':
      return parseYaml
    default:
      throw new Error(`Unsupported file format: ${ext}`)
  }
}

const parseFile = (filepath) => {
  const content = readFile(filepath)
  const parser = getParser(filepath)
  return parser(content)
}

export default parseFile
