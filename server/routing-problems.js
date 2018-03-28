let points = ['A1', 'A2', 'B1', 'B2'];

const values = [
  [0, 1, 3, 3, 4],
  [1, 0, 1, 6, 7],
  [3, 1, 0, 8, 9],
  [3, 6, 8, 0, 10],
  [4, 7, 9, 10, 0],
];

const pointIndexes = {
  '0': 0,
  '1': 1,
  '-1': 2,
  '2': 3,
  '-2': 4,
}

let chains = [
  { chain: ['G', 'A1', 'A2', 'B1', 'B2', 'G'] },
  { chain: ['G', 'A1', 'B1', 'A2', 'B2', 'G'] },
  { chain: ['G', 'A1', 'A2', 'B2', 'B1', 'G'] },
  { chain: ['G', 'A2', 'A1', 'B1', 'B2', 'G'] },
  { chain: ['G', 'A2', 'A1', 'B2', 'B1', 'G'] },
  { chain: ['G', 'A2', 'B2', 'A1', 'B1', 'G'] },
];

export const getChainLength = (chain) => {
  let length = 0;

  for(let index = 0; index < chain.length - 1; index += 1) {
    const currentElemIndex = pointIndexes[chain[index]];
    const nextElemIndex = pointIndexes[chain[index + 1]];

    length += values[currentElemIndex][nextElemIndex];
  }
  return length;
};

export const isFinishChain = (availiablePoints, chain) => {
  if (chain[chain.length - 1] !== 0 || availiablePoints.length + 1 > chain.length) return false;
  const readedPoints = [];
  for (let index = 1; index < chain.length; index += 1) {
    const currentPoint = chain[index];
    if (currentPoint < 0) continue;
    if (readedPoints.findIndex(readedPoint => readedPoint === currentPoint) !== -1) continue;

    readedPoints.push(currentPoint);
    readedPoints.push(-currentPoint);
    for (let j = index + 1; j < chain.length; j += 1) {
      if (chain[j] === -currentPoint) {
        break;
      } else if (j === chain.length - 1) return false;
    }
  }

  return true;
};

export const minimalChain = (points, chain, minLength) => {
  debugger;
  const lastChainPoint = !!chain.length && chain[chain.length - 1];
  const availiablePoints = points.filter(point => point !== lastChainPoint);

  const currentChainLenght = getChainLength(chain);
  if (isFinishChain(points, chain)) {
    if (currentChainLenght < minLength) {
      minimalChain(points, [0], currentChainLenght);
    } return;
  }
  if (currentChainLenght >= minLength) {
    return;
  }
  availiablePoints.forEach((point) => {
    const nextChain = chain.slice();
    nextChain.push(point);
    minimalChain(points, nextChain, minLength);
  });
};


const getAvailiablePoints = (points, chain) => {
  const availiablePoints = [];


  
  return availiablePoints;
};

export const getMinimalChain = (points) => {
  debugger;
  let minimalChain = points.slice();
  minimalChain.push(0);
  let minimalLength = getChainLength(minimalChain);

  const minimalChain2 = (points, chain, minLength, availiablePoints) => {
    const currentChainLenght = getChainLength(chain);

    if (currentChainLenght > minLength) {
      console.log(chain);
      return;
    }

    if (isFinishChain(points, chain) && currentChainLenght < minLength) {
        minLength = currentChainLenght;
        minimalChain = chain;
        return;
    }

    availiablePoints.forEach((point) => {
      const nextChain = chain.slice();
      const nextAvailiablePoints = availiablePoints.map(availiablePoint => {
        if (point === availiablePoint) {
          if (point > 0) {
            return -point;
          } else return;
        }
        return availiablePoint;
      });
      if (nextAvailiablePoints[0] === undefined) nextAvailiablePoints[0] = 0; // problem place!

      nextChain.push(point);
      minimalChain2(points, nextChain, minLength, nextAvailiablePoints);
    });

    return;
  };

  const initialAvailiablePoints = points.filter(point => point > 0);
  minimalChain2(points, [0], minimalLength, initialAvailiablePoints);

  console.log({ chain: minimalChain, length: minimalLength });
  return { chain: minimalChain, length: minimalLength };
};
