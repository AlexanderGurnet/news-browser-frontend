import { DEFAULT_IMG_URL, URL_REGEXP_CHECK } from '../constants/data-for-utils';

const setDefaultImage = (urlToImage) => {
  if (urlToImage !== null && urlToImage.match(URL_REGEXP_CHECK)) {
    return urlToImage;
  }
  return DEFAULT_IMG_URL;
};

export default setDefaultImage;
