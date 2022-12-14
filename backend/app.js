const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const cors = require('cors');

require('dotenv').config();

const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

const errorHandling = require('./middlewares/error');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: [
    'https://begunovdv.students.nomoredomains.sbs',
    'http://begunovdv.students.nomoredomains.sbs',
    'http://localhost:3000',
  ],
  optionsSuccessStatus: 200,
};

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(helmet());

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(requestLogger);

app.use(require('./routes/auth'));

app.use(auth);

app.use(require('./routes/index'));

app.use((req, res, next) => {
  next(new NotFoundError('Путь не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandling);

app.listen(PORT);
