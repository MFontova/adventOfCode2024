import * as fs from 'fs'
import { join } from 'path'

function getCorrectUpdates(rules: number[][], updates: number[][]) {
  let result = 0
  let corrects: Set<number[]> = new Set()
  let incorrects: Set<number[]> = new Set()
  updates.forEach(update => {
    let isCorrect = true
    for (let i = 1; i < update.length; i++) {
      let current = [update[i - 1], update[i]]
      if(rules.some(rule => rule[0] === current[0] && rule[1] === current[1])) {
        isCorrect = true
      } else {
        isCorrect = false
        incorrects.add(update)
        return
      }
    }
    corrects.add(update)
    result += update[(update.length - 1) / 2]
  })
  console.log('corrects', corrects)
  console.log('incorrects', incorrects)
  console.log(result)
}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)

const input = fs.readFileSync(filePath, 'utf-8').split('\r\n')
const indexToSplit = input.indexOf('')
const rules = input.slice(0, indexToSplit).map(rule => rule.split('|').map(Number))
const updates = input.slice(indexToSplit + 1).map(update => update.split(',').map(Number))

getCorrectUpdates(rules, updates)