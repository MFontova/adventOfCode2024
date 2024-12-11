import * as fs from 'fs';
import { join } from 'path';

function guardPath(input: string[][]) {
  function insideBoundaries(position: number[]) {
    return position[0] >= 0 && position[1] >= 0 && position[0] < input.length && position[1] < input[0].length;
  }

  let directions = ['U', 'R', 'D', 'L'];
  let movements = [
    [-1, 0], // Up
    [0, 1],  // Right
    [1, 0],  // Down
    [0, -1], // Left
  ];

  // Encontrar posición inicial del guardia
  let guardPosition: number[] = [];
  let directionIndex = 0; // 0 -> Up

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === '^') {
        guardPosition = [i, j];
        directionIndex = 0; // Facing up
      }
    }
  }

  let distinctPositions = new Set<string>();
  distinctPositions.add(`${guardPosition[0]},${guardPosition[1]}`);

  while (true) {
    let nextStep = movements[directionIndex];
    let nextPosition = [guardPosition[0] + nextStep[0], guardPosition[1] + nextStep[1]];

    if (!insideBoundaries(nextPosition)) {
      // Salir si está fuera de los límites
      break;
    }

    if (input[nextPosition[0]][nextPosition[1]] === '#') {
      // Obstáculo encontrado, girar a la derecha
      directionIndex = (directionIndex + 1) % 4;
    } else {
      // Moverse a la siguiente posición
      guardPosition = nextPosition;
      distinctPositions.add(`${guardPosition[0]},${guardPosition[1]}`);
    }
  }

  console.log(`Distinct positions visited: ${distinctPositions.size}`);
  return distinctPositions.size;
}

// Leer archivo e invocar la función
const fileName = 'input.txt';
const filePath = join(__dirname, fileName);

const input = fs.readFileSync(filePath, 'utf-8').split('\n').map(line => line.split(''));
guardPath(input);
