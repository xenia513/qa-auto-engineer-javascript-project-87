import _ from 'lodash'

const getDifference = (data1, data2) => {
  const keys1 = _.keys(data1)
  const keys2 = _.keys(data2)
  const keys = _.sortBy(_.union(keys1, keys2))

  return keys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 }
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1 }
    }
    if (!_.isEqual(value1, value2)) {
      return { key, type: 'updated', value: { value1, value2 } }
    }
    return { key, type: 'equal', value: value1 }
  })
}

export default getDifference
