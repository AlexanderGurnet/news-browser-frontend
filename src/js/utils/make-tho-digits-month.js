const makeTwoDigitsMonth = (num) => {
  if (num < 9) {
    return `0${num + 1}`;
  }
  return num + 1;
};

export default makeTwoDigitsMonth;
