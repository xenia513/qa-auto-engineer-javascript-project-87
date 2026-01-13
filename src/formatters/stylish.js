const getIndent = (depth, type = 'content') => {
  const spacesPerDepth = 4
  let indentSpaces = (depth - 1) * spacesPerDepth
  if (type === 'content') {
    indentSpaces += 2
  }
  return ' '.repeat(indentSpaces)
}

const iter = (tree, depth) => {
  const bracketIndent = getIndent(depth, 'bracket')
  const result = tree
    .map(({
      key, type, value,
    }) => {
      const contentIndent = getIndent(depth, 'content')
      switch (type) {
        case 'added':
          return `${contentIndent}+ ${key}: ${String(value)}`
        case 'removed':
          return `${contentIndent}- ${key}: ${String(value)}`
        case 'updated':
          return `${contentIndent}- ${key}: ${String(value.value1)}\n${contentIndent}+ ${key}: ${String(value.value2)}`
        default:
          return `${contentIndent}  ${key}: ${String(value)}`
      }
    })
  return ['{', ...result, `${bracketIndent}}`].join('\n')
}

const formatStylish = (data) => {
  return iter(data, 1)
}

export default formatStylish
