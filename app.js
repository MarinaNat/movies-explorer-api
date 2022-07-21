require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(helmet());
app.use(requestLogger);
app.use(cors({ credentials: true, origin: ['https://apimarina-movies-explorer.nomoredomains.xyz/', 'http://apimarina-movies-explorer.nomoredomains.xyz/', 'http://marina-movies-explorer.nomoredomains.xyz', 'marina-movies-explorer.nomoredomains.xyz', 'http://localhost:3001', 'http://localhost:3000', 'https://localhost:3001', 'https://localhost:3000', 'https://web.postman.co'] }));

app.get('/crash-test', () => { // удалить после прохождения ревью (crash-test)
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true, family: 4 });

app.use('/', routes);

app.use(errorLogger);
app.use(errors());

app.use(handleErrors);
app.listen(PORT, () => {
  console.log(`App слушает порт ${PORT}`);
});
