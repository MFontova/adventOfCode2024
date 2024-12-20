import * as fs from 'fs'
import { join } from 'path'

// function possibleDesings(patterns: string[], designs: string[]) {
//   const possibles = new Set()

//   patterns.sort((a, b) => b.length - a.length)

//   for (const design of designs) {
//     let currentDesign = design
  
//     for(const pattern of patterns) {
//       while(currentDesign.includes(pattern)) {
//         currentDesign = currentDesign.replace(pattern, '')
//       }

//       if(currentDesign.length == 0) {
//         possibles.add(design)
//       }
//     }
//   }

//   console.log(possibles.size)
// }

type TowelPattern = string;
type Design = string[];

function isDesignPossible(design: Design, patterns: TowelPattern[]): boolean {
  let index = 0;

  while (index < design.length) {
    let matched = false;

    for (const pattern of patterns) {
      if (design[index].startsWith(pattern)) {
        index += pattern.length;
        matched = true;
        break;
      }
    }

    if (!matched) return false;
  }

  return true;
}

function countPossibleDesigns(patterns: TowelPattern[], designs: Design[]): number {
  return designs.filter(design => isDesignPossible(design, patterns)).length;
}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)
const input = fs.readFileSync(filePath, 'utf-8')

const [patternsStr, ...designs] = input.trim().split('\n').map(line => line.trim());
const patterns = patternsStr.split(',').map(pattern => pattern.trim());

const filteredDesigns: Design = designs.filter(design => design !== '');

console.log(patterns, filteredDesigns)

// possibleDesings(patterns, filteredDesigns)

const possiblesDesignsCount = countPossibleDesigns(patterns, filteredDesigns)
console.log(po)