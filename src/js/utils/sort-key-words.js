/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

const LAST_OF_PART_OF_THE_PHRASE = 'других';

const sortKeyWords = (keyWords) => {
  const countedKeyWords = keyWords.reduce((reducer, keyword) => {
    if (typeof reducer[keyword] !== 'undefined') {
      reducer[keyword]++;
      return reducer;
    }
    reducer[keyword] = 1;
    return reducer;
  }, {});

  const sorted = Object.keys(countedKeyWords).sort(
    (a, b) => countedKeyWords[b] - countedKeyWords[a],
  );
  if (sorted.length <= 3) {
    return sorted;
  }
  return [sorted[0], sorted[1], `${sorted.length - 2} ${LAST_OF_PART_OF_THE_PHRASE}`];
};

export default sortKeyWords;
