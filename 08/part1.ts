import * as fs from 'fs'
import { join } from 'path'

function getAntinodes(input: string[]) {
  function insideBoundaries(antinode: number[]) {
    return antinode[0] >= 0 && antinode[1] >=0 && antinode[0] < input.length && antinode[1] < input[0].length
  }

  let antennasTypes: Record<string, number[][]> = {}
  let antinodesSet: Set<string> = new Set()

  input.forEach((line, i) => {
    line.split('').forEach((item, j) => {
      if(input[i][j] !== '.') {
        if(antennasTypes[input[i][j]] === undefined) {
          antennasTypes[input[i][j]] = []
        }
        antennasTypes[input[i][j]].push([i, j])
      }
    })
  })
  
  console.log('antennasTypes', antennasTypes)

  for (const [type, antennas] of Object.entries(antennasTypes)) {
    antennas.forEach((currentAntenna, i) => {
      antennas.forEach((antenna, j) => {
        let diff = [currentAntenna[0] - antenna[0], currentAntenna[1] - antenna[1]]
        let antinode = [currentAntenna[0] + diff[0], currentAntenna[1] + diff[1]]
        if(antinode[0] !== currentAntenna[0] && antinode[1] !== currentAntenna[1] && insideBoundaries(antinode)) {
          antinodesSet.add(`${currentAntenna[0] + diff[0]}, ${currentAntenna[1] + diff[1]}`)
        }
      })
    })
  }

  console.log('antinodes', antinodesSet)
  console.log(antinodesSet.size)
}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)

const input = fs.readFileSync(filePath, 'utf-8').split('\r\n')

console.log(input)

getAntinodes(input)