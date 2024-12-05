import * as fs from 'fs'
import { join } from 'path'

function getCorrectUpdates(rules: number[][], updates: number[][]) {
  let result = 0
  let result2 = 0
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
  // console.log('corrects', corrects)
  console.log('incorrects', incorrects)

  function isCorrect(update: number[]) {
    let isCorrect = true
    for (let i = 1; i < update.length; i++) {
      let current = [update[i - 1], update[i]]
      if(rules.some(rule => rule[0] === current[0] && rule[1] === current[1])) {
        isCorrect = true
      } else {
        isCorrect = false
        return
      }
    }
    return isCorrect
  }
  
  incorrects.forEach(update => {
    let correct = isCorrect(update)
    while(!correct) {
      for(let i = 1; i < update.length; i++) {
        let current = [update[i - 1], update[i]]
        if(rules.some(rule => rule[1] === current[0] && rule[0] === current[1])) {
          let first = update[i - 1]
          let second = update[i]
          update[i - 1] = second
          update[i] = first
        }
      }
      correct = isCorrect(update)
    }
    console.log('fixed', update)
    result2 += update[(update.length - 1) / 2]
  })
  console.log(result2)
}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)

const input = fs.readFileSync(filePath, 'utf-8').split('\r\n')
const indexToSplit = input.indexOf('')
const rules = input.slice(0, indexToSplit).map(rule => rule.split('|').map(Number))
const updates = input.slice(indexToSplit + 1).map(update => update.split(',').map(Number))

getCorrectUpdates(rules, updates)