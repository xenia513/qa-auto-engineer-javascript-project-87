import genDiff from '../index.js'
import path from 'path'

const __dirname = path.resolve()

const getFixturePath = (filename) => 
  path.join(__dirname, '__fixtures__', filename)

describe('gendiff', () => {
  test('compares two flat JSON files', () => {
    const filepath1 = getFixturePath('file1.json')
    const filepath2 = getFixturePath('file2.json')

    const result = genDiff(filepath1, filepath2)

    expect(result).toBe(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`)
  })

  test('handles identical files', () => {
    const filepath = getFixturePath('file1.json')
    const result = genDiff(filepath, filepath)

    expect(result).toBe(`{
    follow: false
    host: hexlet.io
    proxy: 123.234.53.22
    timeout: 50
}`)
  })
})
// Тесты для YAML
  describe('YAML format', () => {
    test('compares two flat YAML files', () => {
      const filepath1 = getFixturePath('file1.yml')
      const filepath2 = getFixturePath('file2.yml')

      const result = genDiff(filepath1, filepath2)

      expect(result).toBe(`{
        - follow: false
          host: hexlet.io
        - proxy: 123.234.53.22
        - timeout: 50
        + timeout: 20
        + verbose: true
      }`)
    })

    test('handles identical YAML files', () => {
      const filepath = getFixturePath('file1.yml')
      const result = genDiff(filepath, filepath)

      expect(result).toBe(`{
        follow: false
        host: hexlet.io
        proxy: 123.234.53.22
        timeout: 50
      }`)
    })
  })

  // Тесты для plain-форматтера
  test('plain format output', () => {
    const result = gendiff(
      getFixturePath('file1.json'),
      getFixturePath('file2.json'),
      'plain'
    )

    expect(result).toBe(`Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`);
  })

  test('nested plain format', () => {
    const result = gendiff(
      getFixturePath('nested1.json'),
      getFixturePath('nested2.json'),
      'plain'
    )

    expect(result).toBe(`Property 'timeout' was updated. From 50 to 20
Property 'database.port' was updated. From 5432 to 5433
Property 'database.host' was updated. From localhost to remote.host
Property 'features' was updated. From ["cache","logging"] to ["logging","monitoring"]`)
  })

    // Тесты для json-форматтера
    test('json format output', () => {
  const result = gendiff(
    getFixturePath('file1.json'),
    getFixturePath('file2.json'),
    'json'
  )

  const expected = [
    { key: 'follow', type: 'removed', value: false },
    { key: 'proxy', type: 'removed', value: '123.234.53.22' },
    { key: 'timeout', type: 'changed', oldValue: 50, newValue: 20 },
    { key: 'verbose', type: 'added', value: true }
  ]

  expect(JSON.parse(result)).toEqual(expected);
})

test('nested json format', () => {
  const result = gendiff(
    getFixturePath('nested1.json'),
    getFixturePath('nested2.json'),
    'json'
  )

  const expected = [
    { key: 'timeout', type: 'changed', oldValue: 50, newValue: 20 },
    { key: 'database.port', type: 'changed', oldValue: 5432, newValue: 5433 },
    { key: 'database.host', type: 'changed', oldValue: 'localhost', newValue: 'remote.host' },
    { 
      key: 'features',
      type: 'changed',
      oldValue: ['cache', 'logging'],
      newValue: ['logging', 'monitoring']
    }
  ]

  expect(JSON.parse(result)).toEqual(expected)
})