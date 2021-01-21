import addClassToElement from '../utils/add-class-to-element';

const iterateThroughArrayOfPairs = (arrayOfPairs) => {
  arrayOfPairs.forEach((pair) => addClassToElement(pair[0], pair[1]));
};

export default iterateThroughArrayOfPairs;