import * as fs from 'fs'
import { join } from "path"

function cleanString(input: string): string {
  let text = input
  while (text.includes("don't()")) {
    let startIndex = text.indexOf("don't()")
    let endIndex = text.indexOf("do()", startIndex) == -1 ? text.length -1 : text.indexOf("do()", startIndex)
    let sbstrToRemove = text.slice(startIndex, endIndex)
    text = text.replace(sbstrToRemove, '.')
  }

  return text
}

function getMultiplications(input: string) {
  // input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don't()mul(5,6)fasdmul(9,9)do()mul(2,2)"
  const regexp = /mul\(\d{1,3},\d{1,3}\)/g
  const secondRegexp = /\d{1,3}/g

  input = cleanString(input)

  const matches = [...input.matchAll(regexp)]

  let counter = 0
  matches.forEach(match => {
    const secondMatches = [...match[0].matchAll(secondRegexp)]

    const product = Number(secondMatches[0][0]) * Number(secondMatches[1][0])
    counter += product
  })
  
  console.log(counter)
}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)

const input = fs.readFileSync(filePath, 'utf-8')

getMultiplications(input)
