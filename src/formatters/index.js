import _ from 'lodash'
import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formatters = {
  stylish,
  plain,
  json,
};

const getFormatter = (file, formatName = 'stylish') => {
  if (!_.has(formatters, formatName)) {
    throw new Error('Unknown format!')
  }
  return formatters[formatName](file)
}

export default getFormatter