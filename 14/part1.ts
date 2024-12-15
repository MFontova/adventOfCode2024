import * as fs from 'fs'
import { join } from 'path'

type Robots = {
  p: number[];
  v: number[];
}[]

function getSafetyFactor(robots: Robots) {
  const height = 103
  const width = 101

  let i = 0
  while(i < 100) {
    robots.forEach(robot => {
      let newPosition = [robot.p[0] + robot.v[0], robot.p[1] + robot.v[1]]
      // console.log(newPosition)
      if(newPosition[1] >= height) {
        newPosition[1] = newPosition[1] - height
      }
      if(newPosition[1] < 0) {
        newPosition[1] = newPosition[1] + height
      }
      if(newPosition[0] >= width) {
        newPosition[0] = newPosition[0] - width
      }
      if(newPosition[0] < 0) {
        newPosition[0] = newPosition[0] + width
      }
      robot.p = [...newPosition]
    })
    // console.log(robots)
    i++
  }
  // console.log(robots)

  const horizontalMiddle = Math.trunc(height/2)
  const verticalMiddle = Math.trunc(width/2)

  // console.log('horizontalMiddle', horizontalMiddle)
  // console.log('verticalMiddle', verticalMiddle)

  let firstQuadrant: Robots = robots.filter(robot => robot.p[0] < verticalMiddle && robot.p[1] < horizontalMiddle)
  let secondQuadrant: Robots = robots.filter(robot => robot.p[0] > verticalMiddle && robot.p[1] < horizontalMiddle)
  let thirdQuadrant: Robots = robots.filter(robot => robot.p[0] < verticalMiddle && robot.p[1] > horizontalMiddle)
  let fourthQuadrant: Robots = robots.filter(robot => robot.p[0] > verticalMiddle && robot.p[1] > horizontalMiddle)

  const result = firstQuadrant.length * secondQuadrant.length * thirdQuadrant.length * fourthQuadrant.length

  console.log(result)
}

const fileName = 'input.txt'
const filePath = join(__dirname, fileName)

const input = fs.readFileSync(filePath, 'utf-8')

const parseRobotsData = (data: string): Robots => {
  return data.trim().split("\n").map(line => {
    const [pPart, vPart] = line.split(" v=");
    const p = pPart.replace("p=", "").split(",").map(Number);
    const v = vPart.split(",").map(Number);
    return { p, v };
  });
};

const robotsInput: Robots = parseRobotsData(input);

console.log(robotsInput)

getSafetyFactor(robotsInput)

const robots: Robots = [
  {
    p: [0,1],
    v: [0,-2],
  }
]

const robots2: Robots = [
  { p: [0, 4], v: [3, -3] },
  { p: [6, 3], v: [-1, -3] },
  { p: [10, 3], v: [-1, 2] },
  { p: [2, 0], v: [2, -1] },
  { p: [0, 0], v: [1, 3] },
  { p: [3, 0], v: [-2, -2] },
  { p: [7, 6], v: [-1, -3] },
  { p: [3, 0], v: [-1, -2] },
  { p: [9, 3], v: [2, 3] },
  { p: [7, 3], v: [-1, 2] },
  { p: [2, 4], v: [2, -3] },
  { p: [9, 5], v: [-3, -3] },
];

// getSafetyFactor(robots2)