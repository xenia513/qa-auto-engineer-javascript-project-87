import genDiff from '../index.js'
import path from 'path'
const __dirname = process.cwd()

const getFixturePath = filename =>
  path.join(__dirname, '__fixtures__', filename)

// тесты для плоских JSON и YAML
const expectedStylishFlat = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

const expectedIdenticalFlat = `{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`

describe('Stylish format (flat files)', () => {
  test.each(['json', 'yml'])('compares two flat files', (ext) => {
    const filepath1 = getFixturePath(`file1.${ext}`)
    const filepath2 = getFixturePath(`file2.${ext}`)
    const result = genDiff(filepath1, filepath2)

    expect(result).toBe(expectedStylishFlat)
  })

  test.each(['json', 'yml'])('handles identical %s files', (ext) => {
    const filepath = getFixturePath(`file1.${ext}`)
    const result = genDiff(filepath, filepath)

    expect(result).toBe(expectedIdenticalFlat)
  })
})

// Тесты для plain-форматтера
describe('plain format', () => {
  test('flat plain format', () => {
    const result = genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'plain',
    )

    expect(result).toBe(`Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`)
  })

  test('nested plain format', () => {
    const result = genDiff(
      getFixturePath('nested1.json'),
      getFixturePath('nested2.json'),
      'plain',
    )

    expect(result).toBe(`Property 'database.host' was updated. From localhost to remote.host
Property 'database.port' was updated. From 5432 to 5433
Property 'features' was updated. From ["cache","logging"] to ["logging","monitoring"]
Property 'timeout' was updated. From 50 to 20`)
  })
})

// Тесты для json-форматтера
describe('json format', () => {
  test('flat json format', () => {
    const result = genDiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'json',
    )

    const expected = [
      { key: 'follow', type: 'removed', value: false },
      { key: 'proxy', type: 'removed', value: '123.234.53.22' },
      { key: 'timeout', type: 'changed', oldValue: 50, newValue: 20 },
      { key: 'verbose', type: 'added', value: true },
    ]

    expect(JSON.parse(result)).toEqual(expected)
  })
})
test('nested json format', () => {
  const result = genDiff(
    getFixturePath('nested1.json'),
    getFixturePath('nested2.json'),
    'json',
  )

  const expected = [
    { key: 'database.host', type: 'changed', oldValue: 'localhost', newValue: 'remote.host' },
    { key: 'database.port', type: 'changed', oldValue: 5432, newValue: 5433 },
    {
      key: 'features',
      type: 'changed',
      oldValue: ['cache', 'logging'],
      newValue: ['logging', 'monitoring'],
    },
    { key: 'timeout', type: 'changed', oldValue: 50, newValue: 20 },
  ]

  expect(JSON.parse(result)).toEqual(expected)
})
