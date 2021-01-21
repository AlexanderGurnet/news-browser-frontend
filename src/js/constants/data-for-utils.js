/* eslint-disable quote-props */
const DEFAULT_IMG_URL = 'https://qsuper.qld.gov.au/-/media/images/qsuperpw/news/news-placeholder-imagesss.jpg';

const URL_REGEXP_CHECK = new RegExp(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/);

const MONTHS = {
  '01': 'января',
  '02': 'февраля',
  '03': 'марта',
  '04': 'апреля',
  '05': 'мая',
  '06': 'июня',
  '07': 'июля',
  '08': 'августа',
  '09': 'сентября',
  '10': 'октября',
  '11': 'ноября',
  '12': 'декабря',
};

export {
  MONTHS,
  DEFAULT_IMG_URL,
  URL_REGEXP_CHECK,
};
