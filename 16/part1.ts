import * as fs from 'fs'
import { join } from 'path'

function getLowestScore(maze: string[][]) {
  const moves = [
    {
      move: [-1, 0],
      face: 'U'
    },
    {
      move: [0, 1],
      face: 'R'
    },
    {
      move: [1, 0],
      face: 'D'
    },
    {
      move: [0, -1],
      face: 'L'
    }
  ]

  // let currentFacing = 'R'

  let position: any[] = []
  let end: number[] = []
  let notVisited: string[] = []
  let visited: string[] = []
  let stack: any[][] = []

  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if(maze[i][j] !== '#' && maze[i][j] !== 'E') {
        notVisited.push(`${i},${j}`)
      }
      if(maze[i][j] == 'S') {
        position = [i, j, 0, 'R']
        stack.push(position)
      }
      if(maze[i][j] == 'E') {
        end = [i, j]
      }
    }
  }

  let ends: number[][] = []

  while (notVisited.length > 0) {
    let currentPosition = stack.shift()!
    notVisited = notVisited.filter(i => i !== `${currentPosition[0]},${currentPosition[1]}`)
    moves.forEach(move => {
      let nextPosition = [currentPosition[0] + move.move[0], currentPosition[1] + move.move[1], currentPosition[2] + 1, move.face]
      if(maze[nextPosition[0]][nextPosition[1]] !== '#' && !visited.includes(`${nextPosition[0]},${nextPosition[1]}`)) {
        if(maze[nextPosition[0]][nextPosition[1]] == 'E') {
          ends.push(nextPosition)
        } else {
          if(currentPosition[3] !== move.face) {
            nextPosition[2] += 1000
          }
          stack.push(nextPosition)
          visited.push(`${currentPosition[0]},${currentPosition[1]}`)
        }
      }
    })
  }

  console.log('ends', ends)
}

const fileName = 'input2.txt'
const filePath = join(__dirname, fileName)
const input = fs.readFileSync(filePath, 'utf-8').split('\r\n').map(line => line.split(''))
getLowestScore(input)