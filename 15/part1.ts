import * as fs from 'fs'
import { join } from 'path'

function sumBoxesCoordinates(map: string[][], movements: string[]) {
  console.log('movements', movements)
  let robotPosition: number[] = []
  let directions: Record<string, number[]> = {
    '^': [-1, 0],
    '>': [0, 1],
    'v': [1, 0],
    '<': [0, -1]
  }

  map.forEach((line, i) => {
    line.forEach((cell, j) => {
      if(cell == '@') {
        robotPosition = [i,j]
      }
    })
  })

  // console.log(map.map(l => l.join()))
  
  movements.forEach(movement => {
    let checkingPosition: number[] = [robotPosition[0] + directions[movement][0], robotPosition[1] + directions[movement][1]]

    while(map[checkingPosition[0]][checkingPosition[1]] === 'O') {
      checkingPosition = [checkingPosition[0] + directions[movement][0], checkingPosition[1] + directions[movement][1]]
    }
    if(map[checkingPosition[0]][checkingPosition[1]] === '.') {
      map[checkingPosition[0]][checkingPosition[1]] = 'O'
      map[robotPosition[0]][robotPosition[1]] = '.'
      robotPosition = [robotPosition[0] + directions[movement][0], robotPosition[1] + directions[movement][1]]
      map[robotPosition[0]][robotPosition[1]] = '@'
    }
  })
  // console.log(map.map(l => l.join()))

  let counter = 0
  map.forEach((line, i) => {
    line.forEach((cell, j) => {
      if(map[i][j] === 'O') {
        counter += 100 * i + j
      }
    })
  })

  console.log(counter)
}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)

// const input = fs.readFileSync(filePath, 'utf-8').split('\r\n').join('_').split('__')

// const map = input[0].split('_').map(l => l.split(''))
// const movements = input[1].split('')
// const movements = ['^', '>', '>', 'v', 'v']
// console.log(movements)

const inputLines = fs.readFileSync(filePath, 'utf-8').split('\r\n');

const map: string[][] = [];
const movementsLines: string[] = [];

let isMap = true;

inputLines.forEach(line => {
  if (line.trim() === '') {
    isMap = false; // Un salto vacío separa mapa de movimientos
  } else if (isMap) {
    map.push(line.split(''));
  } else {
    movementsLines.push(line.trim());
  }
});

const movements = movementsLines.join('').split('');

sumBoxesCoordinates(map, movements)