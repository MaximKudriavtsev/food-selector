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

  chain.forEach((element, index) => {
    const currentElemIndex = pointIndexes[element];
    const nextElemIndex = chain[index + 1] ? pointIndexes[chain[index + 1]] : 0;

    length += values[currentElemIndex][nextElemIndex];
  });

  return length;
};

const createChains = (points) => {
  const chains = [];
  
  let currentChain = ['G'];
  points.forEach((element) => {
    currentChain.push(element);

    points.forEach(tempElement => {
      if (currentChain.findIndex(tempElement) === -1) {
        currentChain.push(tempElement);
      }
    });

    currentChain.push('G');
    chains.chain = currentChain;
    currentChain = ['G'];
  });
  
  return chains;
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

export const generateChain = (points, oldChain, minLength) => {
  const chain = [...oldChain];
  let currentLength = 0;
  let newMinLenght = 0;
  let resultChain = [];

  points.forEach((point) => {
    if (chain[chain.length - 1] !== point) {
      chain.push(point);
    }
    if (getChainLength(chain) >= minLength) {
      chain.pop();
    }
    if (isFinishChain(chain)) {
      if (getChainLength(chain) < minLength) {
        newMinLenght = minLength;
        resultChain = chain;
      }
    }
  });

  return { chain, minLength };
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


export const getMinimalChain = (points) => {
  debugger;
  let minimalChain = points.slice();
  minimalChain.push(0);
  let minimalLength = getChainLength(minimalChain);
  
  const minimalChain2 = (points, chain, minLength) => {
    const lastChainPoint = !!chain.length && chain[chain.length - 1];
    const prevChainPoint = !!(chain.length > 1) && chain[chain.length - 2];
    const availiablePoints = points.filter(point => point !== lastChainPoint && point !== prevChainPoint);
  
    const currentChainLenght = getChainLength(chain);
    if (isFinishChain(points, chain)) {
      if (currentChainLenght < minLength) {

        minimalLength = minLength;
        minimalChain = chain;
        console.log(chain);
        minimalChain2(points, [0], currentChainLenght);
      } return;
    }
    if (currentChainLenght >= minLength) {
      return;
    }
    availiablePoints.forEach((point) => {
      const nextChain = chain.slice();
      nextChain.push(point);
      // console.log(chain);
      minimalChain2(points, nextChain, minLength);
    });
  };

  minimalChain2(points, [0], minimalLength);

  console.log({ chain: minimalChain, length: minimalLength });
  return { chain: minimalChain, length: minimalLength };
};