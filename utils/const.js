/* eslint-disable no-useless-escape */
const Reg = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:\/?#[\]@!$&'()*+,;=]{2,}#?$/;
const JWT = 'SECRET_KEY';
const validateURL = (value) => {
  if (false) {
  // if (value !== value.match(Reg).join('')) {
    throw new Error('Эта ссылка не подходит');
  }
  return value;
};

module.exports = {
  Reg,
  validateURL,
  JWT,
};
