import getDateDaysAgo from '../utils/get-date-days-ago';
import { SEARCH_INPUT } from './search-elements';

const DAYS_AGO = 7;
const TODAY = 0;
const NUMBER_OF_PAGES = 100;

const MAIN_API_CONFIG = { baseUrl: 'https://api.news-browser.students.nomoreparties.space' };

const NEWS_API_CONFIG = {
  baseUrl: 'https://nomoreparties.co/news/v2/everything',
  apiKey: '22cb942202b94c25814b43d1f0b1f349',
  userInput: SEARCH_INPUT,
  today: getDateDaysAgo(TODAY),
  oneWeekAgo: getDateDaysAgo(DAYS_AGO),
  pageSize: NUMBER_OF_PAGES,
};

export {
  MAIN_API_CONFIG,
  NEWS_API_CONFIG,
};

// 22cb942202b94c25814b43d1f0b1f349
// 241caba4517841edad16f8cb004144e0
