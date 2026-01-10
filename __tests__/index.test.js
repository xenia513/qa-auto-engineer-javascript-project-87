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

test.each([extensions])('Compare two files', (ext) => {
  const firstFile = getFixturePath(`file1.${ext}`)
  const secondFile = getFixturePath(`file2.${ext}`)
  expect(genDiff(firstFile, secondFile)).toEqual(expectedStylish)
  expect(genDiff(firstFile, secondFile, 'stylish')).toEqual(expectedStylish)
  expect(genDiff(firstFile, secondFile, 'plain')).toEqual(expectedPlain)
  expect(genDiff(firstFile, secondFile, 'json')).toEqual(expectedJSON)
})

describe('Error handling', () => {
  test.each([extensions])('Wrong file extension or format', (ext) => {
    const wrongExtension = getFixturePath('file1.txt')
    const unknownFormat = 'nonExistentFormat'
    const firstFile = getFixturePath(`file1.${ext}`)
    const secondFile = getFixturePath(`file2.${ext}`)
    expect(() => genDiff(wrongExtension, secondFile, 'json'))
      .toThrowError('Unsupported file format: .txt')
    expect(() => genDiff(firstFile, secondFile, unknownFormat))
      .toThrowError('Unknown format!')
  })

  test('Files do not exist', () => {
    const filepath1 = getFixturePath('non_existent_file1.json')
    const filepath2 = getFixturePath('non_existent_file2.json')
    expect(() => genDiff(filepath1, filepath2)).toThrow()
  })
})
