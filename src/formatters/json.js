const json = (tree) => {
  const flattenAndFormat = (nodes) => {
    return nodes.flatMap(({ key, type, value }) => {
      if (type === 'equal') {
        return []
      }

      const fullPath = key

      if (type === 'updated') {
        return [{
          key: fullPath,
          type: 'changed',
          oldValue: value.value1,
          newValue: value.value2,
        }]
      }
      return [{ key: fullPath, type, value }]
    })
  }

  const formattedData = flattenAndFormat(tree)
  return JSON.stringify(formattedData, null, ' '.repeat(4))
}

export default json
