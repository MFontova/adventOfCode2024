import * as fs from 'fs'
import { join } from 'path'

async function totalDistance() {
  const fileName = 'input.txt'
  const filePath = join(__dirname, fileName)

  try {
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

    let sum = 0
    for (let i = 0; i < firstList.length; i++) {
      sum += Math.abs(firstList[i] - secondList[i])
    }
    console.log(sum)
  } catch (error) {
    console.error(error)
  }
}

// const firstList: number[] = [3, 4, 2, 1, 3, 3]
// const secondList: number[] = [4, 3, 5, 3, 9, 3]
totalDistance()