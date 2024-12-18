import * as fs from 'fs'
import { join } from "path"

function minimumSteps(input: number[][]) {
  const size = 71
  const bytes = 12
  let memory = Array.from({length: size}).map(() => Array.from({length: size}).fill('.'))
  
  let i = 0
  while(i < 1024) {
    const [y, x] = input[i]
    memory[x][y] = '#'
    i++
  }

  console.log(memory.join('\n'))

  let position = [0, 0]
  let queue: number[][] = [[0, 0, 0]]
  const movements: number[][] = [[0, -1], [1, 0], [0, 1], [-1, 0]]
  let visited: string[] = ['0,0']

  while(queue.length > 0) {
    const currentPosition: number[] = queue.shift()!

    if(currentPosition[0] == size - 1 && currentPosition[1] == size - 1) {
      return currentPosition
    }

    for (const [mx, my] of movements) {
      let nextPosition = [currentPosition[0] + mx, currentPosition[1] + my, currentPosition[2] + 1]
      if(nextPosition[0] >= 0 && nextPosition[0] < size && nextPosition[1] >= 0 && nextPosition[1] < size 
        && !visited.includes(`${nextPosition[0]},${nextPosition[1]}`)
        && memory[nextPosition[0]][nextPosition[1]] !== '#'
      ) {
        queue.push(nextPosition)
        visited.push(`${nextPosition[0]},${nextPosition[1]}`)
      }
    }
  }
}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)
const input = fs.readFileSync(filePath, 'utf-8').split('\r\n').map(line => line.split(',').map(n => Number(n)))

console.log(minimumSteps(input))