const formatJson = (data) => {
  return JSON.stringify(data, null, ' '.repeat(4))
}

export default formatJson
