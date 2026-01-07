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