import _ from 'lodash'

const getFullPath = (path, key) => [...path, key].join('.')

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `${value}`
  }
  return String(value)
}

const formatPlain = (data) => {
  const result = data.map(({
    key, type, value,
  }) => {
    const fullPath = getFullPath('', key)
    switch (type) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${stringify(value)}`
      case 'removed':
        return `Property '${fullPath}' was removed`
      case 'updated':
        return `Property '${fullPath}' was updated. From ${stringify(value.value1)} to ${stringify(value.value2)}`
      default:
        return null
    }
  })
  return result.filter(element => element !== null).join('\n')
}

export default formatPlain
