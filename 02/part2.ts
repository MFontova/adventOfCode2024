import * as fs from 'fs'
import { join } from 'path'

function isSafe(report: number[]): boolean {
  let safe = true
  let direction = ''
  for (let i = 1; i < report.length; i++) {
    if(report[i] == report[i - 1]) {
      safe = false
    }
    if(i == 1) {
      if(report[i] > report[i - 1]) {
        direction = 'INC'
      } else {
        direction = 'DEC'
      }
    }
    if(
      (direction === 'INC' && report[i - 1] > report[i]
      || direction === 'DEC' && report[i - 1] < report[i])
    ) {
      safe = false
    } else {
      if(Math.abs(report[i -  1] - report[i]) > 3) {
        safe = false
      }
    }
  }
  return safe
}

function safeReports(reports: number[][]) {
  const fileName = 'input.txt'
  const filePath = join(__dirname, fileName)

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const reports = fileContent.split(/[\r\n]+/).filter(line => line.trim() !== '').map(line => line.split(' ').map(i => Number(i)))

    let counter = 0
    reports.forEach(report => {
      let safe = isSafe(report)
      if(!safe) {
        for (let i = 0; i < report.length; i++) {
          const shortReport = [...report]
          shortReport.splice(i, 1)
          if(isSafe(shortReport)) {
            counter++
            return
          }
        }
      }
      if(safe) {
        counter++
      }
    })
    console.log(counter)
    
  } catch (error) {
    
  }
}

const reports = [
  // [80, 86, 87, 89, 91, 93],
  // [6,8,9,11,14,12],
  [7,6,4,2,1],
  [1,2,7,8,9],
  [9,7,6,2,1],
  [1,3,2,4,5],
  [8,6,4,4,1],
  [1,3,6,7,9],
]
safeReports(reports)