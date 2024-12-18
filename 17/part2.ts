import * as fs from 'fs'
import { join } from 'path'

function trailScores(map: string[][]) {
  const rows = map.length
  const cols = map[0].length
  let trailHeads: {start: number[], score: number}[] = []
  const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]]

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const element = map[i][j];
      if(map[i][j] == '0') {
        trailHeads.push({start: [i, j], score: 0})
      }
    }    
  }

  trailHeads.forEach(trailHead => {
    let queue: number[][] = []
    queue.push(trailHead.start)
    while(queue.length > 0) {
      let [x, y] = queue.shift()!
      if(map[x][y] == '9' ) {
        trailHead.score++
      }
      for (const [dx, dy] of directions) {
        let nextPosition = [x + dx, y + dy]
        if(
          (nextPosition[0] >= 0 && nextPosition[1] >= 0 && nextPosition[0] < cols && nextPosition[1] < rows) && 
          Number(map[x][y]) + 1 == Number(map[nextPosition[0]][nextPosition[1]])
        ) {
          queue.push([x + dx, y + dy])
        }
      }
    }
  })

  console.log('trailHeads', trailHeads)
  let sum = 0
  trailHeads.forEach(trailHeads => sum += trailHeads.score)
  console.log('sum', sum)
}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)
const input = fs.readFileSync(filePath, 'utf-8').split('\r\n').map(line => line.split(''))

trailScores(input)