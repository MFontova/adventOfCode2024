import * as fs from 'fs'
import { join } from "path"


function findXMAS(input: string) {
  function insideLimits(position: number[]) {
    if(position[0] >= 0 && position[1] >= 0 && position[0] < height && position[1] < width) {
      return true
    }
    return false
  }
  const inputArray = input.split('\r\n').map(line => line.split(''))
  const height = inputArray.length
  const width = inputArray[0].length
  console.log(height, width)
  const positions = {
    topLeft: [-1, -1],
    topRight: [-1, 1],
    botLeft: [1, -1],
    botRight: [1, 1]
  }


  let counter = 0

  for (let i = 0; i < inputArray.length; i++) {
    for (let j = 0; j < inputArray.length; j++) {
      if(inputArray[i][j] === 'A') {
        let topLeftPosition = [i + positions.topLeft[0], j + positions.topLeft[1]]
        let topRigthPosition = [i + positions.topRight[0], j + positions.topRight[1]]
        let botLeftPosition = [i + positions.botLeft[0], j + positions.botLeft[1]]
        let botRightPosition = [i + positions.botRight[0], j + positions.botRight[1]]

        if(
          insideLimits(topLeftPosition) && inputArray[topLeftPosition[0]][topLeftPosition[1]] == 'M'
          && insideLimits(topRigthPosition) && inputArray[topRigthPosition[0]][topRigthPosition[1]] == 'S'
          && insideLimits(botLeftPosition) && inputArray[botLeftPosition[0]][botLeftPosition[1]] == 'M'
          && insideLimits(botRightPosition) && inputArray[botRightPosition[0]][botRightPosition[1]] == 'S'
        ) {
          counter++
        }
        
        if(
          insideLimits(topLeftPosition) && inputArray[topLeftPosition[0]][topLeftPosition[1]] == 'S'
          && insideLimits(topRigthPosition) && inputArray[topRigthPosition[0]][topRigthPosition[1]] == 'M'
          && insideLimits(botLeftPosition) && inputArray[botLeftPosition[0]][botLeftPosition[1]] == 'S'
          && insideLimits(botRightPosition) && inputArray[botRightPosition[0]][botRightPosition[1]] == 'M'
        ) {
          counter ++
        }

        if(
          insideLimits(topLeftPosition) && inputArray[topLeftPosition[0]][topLeftPosition[1]] == 'M'
          && insideLimits(topRigthPosition) && inputArray[topRigthPosition[0]][topRigthPosition[1]] == 'M'
          && insideLimits(botLeftPosition) && inputArray[botLeftPosition[0]][botLeftPosition[1]] == 'S'
          && insideLimits(botRightPosition) && inputArray[botRightPosition[0]][botRightPosition[1]] == 'S'
        ){
          counter++
        }

        if(
          insideLimits(topLeftPosition) && inputArray[topLeftPosition[0]][topLeftPosition[1]] == 'S'
          && insideLimits(topRigthPosition) && inputArray[topRigthPosition[0]][topRigthPosition[1]] == 'S'
          && insideLimits(botLeftPosition) && inputArray[botLeftPosition[0]][botLeftPosition[1]] == 'M'
          && insideLimits(botRightPosition) && inputArray[botRightPosition[0]][botRightPosition[1]] == 'M'
        ) {
          counter++
        }
      }
    }
  }


  console.log(counter)

}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)

const input = fs.readFileSync(filePath, 'utf-8')
findXMAS(input)