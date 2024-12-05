import * as fs from 'fs'
import { join } from "path"

function insideLimits(height: number, width: number, position: number[]) {
  if(position[0] >= 0 && position[1] >= 0 && position[0] < height && position[1] < width) {
    return true
  }
  return false
}

function findXMAS(input: string) {
  const inputArray = input.split('\r\n').map(line => line.split(''))
  const height = inputArray.length
  const width = inputArray[0].length
  const positions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ]

  let counter = 0

  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray[0].length; j++) {
      if(inputArray[i][j] === 'X'){
        positions.forEach(position => {
          let newPosition = [i + position[0], j + position[1]]
          if(insideLimits(height, width, newPosition) && inputArray[newPosition[0]][newPosition[1]] == 'M') {
            newPosition = [newPosition[0] + position[0], newPosition[1] + position[1]]
            if(insideLimits(height, width, newPosition) && inputArray[newPosition[0]][newPosition[1]] == 'A') {
              newPosition = [newPosition[0] + position[0], newPosition[1] + position[1]]
              if(insideLimits(height, width, newPosition) && inputArray[newPosition[0]][newPosition[1]] == 'S') {
                counter++
              }
            }
          }
        })
      }
    }
  }
  console.log(counter)
}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)

const input = fs.readFileSync(filePath, 'utf-8')
findXMAS(input)