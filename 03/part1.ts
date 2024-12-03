import * as fs from 'fs'
import { join } from "path"

function getMultiplications(input: string) {
  const regexp = /mul\(\d{1,3},\d{1,3}\)/g
  const secondRegexp = /\d{1,3}/g

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

// const input = fs.readFileSync(filePath, 'utf-8')
const input = "xmul(2,4)&mul[3,7]!^.do()?mul(8,5)).do()mul(2,2)"

getMultiplications(input)