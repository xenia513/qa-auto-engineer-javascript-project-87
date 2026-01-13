import genDiff from '../src/index.js'
import path from 'path'
import { readFileSync } from 'fs'

const __dirname = process.cwd()

const getFixturePath = filename =>
  path.join(__dirname, '__fixtures__', filename)

const readFile = filename => readFileSync(getFixturePath(filename), 'utf-8')

const expectedStylish = readFile('expected-stylish.txt')
const expectedPlain = readFile('expected-plain.txt')
const expectedJSON = readFile('expected-json.txt')

const extensions = ['json', 'yml', 'yaml']

test.each([extensions])('Compare two %s files', (ext) => {
  const filepath1 = getFixturePath(`file1.${ext}`)
  const filepath2 = getFixturePath(`file2.${ext}`)
  expect(genDiff(filepath1, filepath2)).toEqual(expectedStylish)
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish)
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain)
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expectedJSON)
})

describe('Error handling', () => {
  test.each([extensions])('Wrong file extension or format', (ext) => {
    const wrongExtension = getFixturePath('file1.txt')
    const unknownFormat = 'nonExistentFormat'
    const filepath1 = getFixturePath(`file1.${ext}`)
    const filepath2 = getFixturePath(`file2.${ext}`)
    expect(() => genDiff(wrongExtension, filepath2, 'json'))
      .toThrowError('Unsupported file format: txt')
    expect(() => genDiff(filepath1, filepath2, unknownFormat))
      .toThrowError(`Unknown format: ${unknownFormat}`)
  })

  test('Files do not exist', () => {
    const filepath1 = getFixturePath('non_existent_file1.json')
    const filepath2 = getFixturePath('non_existent_file2.json')
    expect(() => genDiff(filepath1, filepath2)).toThrow()
  })
})
