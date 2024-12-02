import * as fs from 'fs'
import { join } from 'path'

function similarityScore() {
  const fileName = 'input.txt'
  const filePath = join(__dirname, fileName)

  try {
    console.log('tryyy')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const lines = fileContent.split('\n').filter(line => line.trim() !== '')

    const firstList: number[] = []
    const secondList: number[] = []

    for(const line of lines) {
      const [col1, col2] = line.trim().split(/\s+/).map(Number)
      firstList.push(col1)
      secondList.push(col2)
    }
    firstList.sort((a, b) => a - b)
    secondList.sort((a, b) => a - b)

    let result = 0
    for(let i = 0; i < firstList.length; i++) {
      let counter = 0
      for(let j = 0; j < secondList.length; j++) {
        if(firstList[i] == secondList[j]) {
          counter += secondList[j]
        }
      }
      result += counter
    }

    console.log('result', result)

  } catch (error) {
    console.error(error)
  }
}

similarityScore()