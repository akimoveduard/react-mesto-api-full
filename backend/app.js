const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const { errors } = require('celebrate');
const { validateUserCreate, validateUserLogin } = require('./middlewares/celebrate');

const corsOrigins = require('./utils/cors-origins');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

const ErrorNotFound = require('./utils/errors/not-found');
const handleErrors = require('./middlewares/handle-errors');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000, MONGODB_CONNECT = 'mongodb://localhost:27017/mestodb' } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(helmet());
app.use(limiter);

app.use(cookieParser());

mongoose.connect(MONGODB_CONNECT);

app.use(cors(corsOrigins));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { createUser, login } = require('./controllers/users');

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateUserCreate, createUser);
app.post('/signin', validateUserLogin, login);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход.' });
});

app.use(auth);

app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new ErrorNotFound('Такой страницы не существует.'));
});

app.use(handleErrors);

app.listen(PORT);
