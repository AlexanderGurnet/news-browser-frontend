import makeTwoDigitsDay from './make-two-digits-day';
import makeTwoDigitsMonth from './make-tho-digits-month';

const getDateDaysAgo = (days) => {
  const date = new Date();
  const last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
  const day = makeTwoDigitsDay(last.getDate());
  const month = makeTwoDigitsMonth(last.getMonth());
  const year = last.getFullYear();
  return `${year}-${month}-${day}`;
};

export default getDateDaysAgo;
