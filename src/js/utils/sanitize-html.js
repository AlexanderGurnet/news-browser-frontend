const regex = /(<([^>]+)>)/ig;

const sanitizeHTML = (str) => str.replace(regex, '');

export default sanitizeHTML;
