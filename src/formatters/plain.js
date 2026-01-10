const getRightValue = (value) => {
  if (Array.isArray(value)) {
    return `${JSON.stringify(value)}`
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `${value}`
  }
  return String(value)
}

const plain = (data) => {
  const iter = (tree, path = '') => {
    const result = tree.flatMap(({
      key, type, value,
    }) => {
      const currentPath = ([...path, key])
      const fullPath = currentPath.join('.')
      switch (type) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${getRightValue(value)}`
        case 'removed':
          return `Property '${fullPath}' was removed`
        case 'updated':
          return `Property '${fullPath}' was updated. From ${getRightValue(value.value1)} to ${getRightValue(value.value2)}`
        default:
          return null
      }
    })
    return result
  }
  return iter(data).filter(element => element !== null).join('\n')
}

export default plain
