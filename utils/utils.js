const allowedCors = [
  'https://apimarina-movies-explorer.nomoredomains.xyz',
  'http://apimarina-movies-explorer.nomoredomains.xyz',
  'http://marina-movies-explorer.nomoredomains.xyz',
  'https://marina-movies-explorer.nomoredomains.xyz',
  'http://localhost:3001',
  'http://localhost:3000',
  'https://localhost:3001',
  'https://localhost:3000',
  'https://web.postman.co',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
};
