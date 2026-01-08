import _ from 'lodash'

const stringify = (value, replacer, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`
    }

    const currentIndent = replacer.repeat(currentDepth)
    const bracketIndent = replacer.repeat(currentDepth - 1)
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, currentDepth + 1)}`)

    return ['{', ...lines, `${bracketIndent}}`].join('\n')
  }
  return iter(value, depth)
}

const stylish = (tree) => {
  const iter = (node, depth) => {
    const replacer = '    '
    const bracketIndent = replacer.repeat(depth - 1)

    const result = Array.from(node)
      .map(({
        key, type, value, children,
      }) => {
        const contentIndent = replacer.repeat(depth - 1) + '  '
        switch (type) {
          case 'nested':
            return `${contentIndent}  ${key}: ${iter(children, depth + 1)}`
          case 'added':
            return `${contentIndent}+ ${key}: ${stringify(value, replacer, depth + 1)}`
          case 'removed':
            return `${contentIndent}- ${key}: ${stringify(value, replacer, depth + 1)}`
          case 'updated':
            return `${contentIndent}- ${key}: ${stringify(value.value1, replacer, depth + 1)}\n${contentIndent}+ ${key}: ${stringify(value.value2, replacer, depth + 1)}`
          default:
            return `${contentIndent}  ${key}: ${stringify(value, replacer, depth + 1)}`
        }
      })
    return ['{', ...result, `${bracketIndent}}`].join('\n')
  }
  return iter(tree, 1)
}

export default stylish
