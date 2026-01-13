import jsYaml from 'js-yaml'

const parseJson = content => JSON.parse(content)
const parseYaml = content => jsYaml.load(content)

const parsers = {
  json: parseJson,
  yml: parseYaml,
  yaml: parseYaml,
}

const parse = (content, format) => {
  const parser = parsers[format]
  if (!parser) {
    throw new Error(`Unsupported file format: ${format}`)
  }
  return parser(content)
}

export default parse
