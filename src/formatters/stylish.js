const stringify = (value) => {
  const iter = (currentValue) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`
    }
    return String(currentValue)
  }
  return iter(value)
}

const stylish = (tree) => {
  const iter = (node, depth) => {
    const replacer = '    '
    const bracketIndent = replacer.repeat(depth - 1)
    const result = Array.from(node)
      .map(({
        key, type, value,
      }) => {
        const contentIndent = replacer.repeat(depth - 1) + '  '
        switch (type) {
          case 'added':
            return `${contentIndent}+ ${key}: ${stringify(value)}`
          case 'removed':
            return `${contentIndent}- ${key}: ${stringify(value)}`
          case 'updated':
            return `${contentIndent}- ${key}: ${stringify(value.value1)}\n${contentIndent}+ ${key}: ${stringify(value.value2)}`
          default:
            return `${contentIndent}  ${key}: ${stringify(value)}`
        }
      })
    return ['{', ...result, `${bracketIndent}}`].join('\n')
  }
  return iter(tree, 1)
}

export default stylish
