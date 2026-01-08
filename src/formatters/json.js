const json = (tree) => {
  const flattenAndFormat = (nodes, path = '') => {
    return nodes.flatMap(({ key, type, value, children }) => {
      // Игнорируем узлы типа 'equal'
      if (type === 'equal') {
        return []
      }

      const fullPath = path ? `${path}.${key}` : key
      
      if (type === 'nested') {
        return flattenAndFormat(children, fullPath)
      }
      
      if (type === 'updated') {
        return { 
          key: fullPath, 
          type: 'changed', 
          oldValue: value.value1, 
          newValue: value.value2 
        }
      }
      return { key: fullPath, type, value }
    })
  }
  
  const formattedData = flattenAndFormat(tree)
  return JSON.stringify(formattedData, null, ' '.repeat(4))
}

export default json