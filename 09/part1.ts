import * as fs from 'fs'
import { join } from 'path'

function filesystemChecksum(input: string) {
  let blocksArray: string[][] = []
  for (let i = 0; i < input.length; i++) {
    if(i % 2 == 0) {
      let item = Array(Number(input[i])).fill(i/2)
      blocksArray.push(item)    
    } else {
      let item = Array(Number(input[i])).fill('.')
      blocksArray.push(item)
    }
  }
  // console.log(blocksArray.join(',').split(','))
  let joinedBlocksArray = blocksArray.join(',').split(',').filter(i => i !== '')

  for (let i = 0; i < joinedBlocksArray.length; i++) {
    if(joinedBlocksArray[i] === '.') {
      for (let j = joinedBlocksArray.length - 1; j > 0; j--) {
        if(joinedBlocksArray[j] !== '.' && i < j){
          joinedBlocksArray[i] = joinedBlocksArray[j]
          joinedBlocksArray[j] = '.'
          break
        }
      }
    }
  }

  // console.log(joinedBlocksArray.join(','))

  let result = 0
  for (let i = 0; i < joinedBlocksArray.length; i++) {
    if(joinedBlocksArray[i] !== '.') {
      result += Number(joinedBlocksArray[i]) * i
    }
  }
  console.log(result)
}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)

const input = fs.readFileSync(filePath, 'utf-8')

// filesystemChecksum('12345')
// filesystemChecksum('2333133121414131402')
filesystemChecksum(input)
// filesystemChecksum('123456789109999999999999')