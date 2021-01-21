import NewsCard from '../components/NewsCard';

const createCard = (
  {
    sourceName,
    title,
    description,
    urlToImage,
    publishedAt,
    sourceLink,
    isLoggedin,
    page,
    keyWord,
    apiLink,
    _id,
  },
) => new NewsCard(
  {
    sourceName,
    title,
    description,
    urlToImage,
    publishedAt,
    sourceLink,
    isLoggedin,
    page,
    keyWord,
    apiLink,
    _id,
  },
);

export default createCard;
