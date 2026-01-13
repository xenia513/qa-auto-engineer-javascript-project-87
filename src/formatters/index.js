import formatStylish from './stylish.js'
import formatPlain from './plain.js'
import formatJson from './json.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
}

const format = (diff, outputFormat = 'stylish') => {
  if (!formatters[outputFormat]) {
    throw new Error(`Unknown format: ${outputFormat}`)
  }
  return formatters[outputFormat](diff)
}

export default format
