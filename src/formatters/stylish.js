const stringify = (value, depth) => {
  const iter = (currentValue) => {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return `${currentValue}`
    }
    return String(currentValue) 
  }
  return iter(value, depth)
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
