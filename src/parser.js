import jsYaml from 'js-yaml'

const parseJson = content => JSON.parse(content)
const parseYaml = content => jsYaml.load(content)

const parsers = {
  json: parseJson,
  yml: parseYaml,
  yaml: parseYaml,
}

const parse = (content, inputFormat) => {
  const parser = parsers[inputFormat]
  if (!parser) {
    throw new Error(`Unsupported file format: ${inputFormat}`)
  }
  return parser(content)
}

export default parse
