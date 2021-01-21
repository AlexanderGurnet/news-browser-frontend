import { MONTHS } from '../constants/data-for-utils';

const toNormalDate = (str) => {
  if (str.length > 17) {
    const year = str.slice(0, 4);
    const month = str.slice(5, 7);
    const day = str.slice(8, 10);
    return `${day} ${MONTHS[month]}, ${year}`;
  }
  return str;
};

export default toNormalDate;
