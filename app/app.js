const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const log4js = require('log4js');
const dotenv = require('dotenv');
dotenv.config();

const config = require('./config')();

// Импорт маршрутов
const indexRouter = require('./routes/index');
const adminPanelRouter = require('./routes/adminpanel');
const adminLoginRouter = require('./routes/adminlogin');
const apiAdminLoginRouter = require('./routes/api_adminlogin');
const apiUpdateVideoRouter = require('./routes/api_updatevideo');
const apiUpdateSlideRouter = require('./routes/api_updateslide');
const apiDropSlideRouter = require('./routes/api_dropslide');
const apiUpdatePartnerRouter = require('./routes/api_updatepartner');
const apiDropPartnerRouter = require('./routes/api_droppartner');
const apiDropVideoRouter = require('./routes/api_dropvideo');

// Конфигурация log4js
log4js.configure({
  appenders: {
    console: { type: 'stdout', layout: { type: 'colored' } },
    dateFile: {
      type: 'dateFile',
      filename: `logs/${config.logFile}`,
      layout: { type: 'basic' },
      compress: true,
      daysToKeep: 14,
      keepFileExt: true
    }
  },
  categories: {
    default: { appenders: ['console', 'dateFile'], level: config.logLevel }
  }
});

const app = express();
const appLogger = log4js.getLogger();

// Настройка view engine
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

// Мидлвары
app.use((req, res, next) => {
  req.logger = appLogger;
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));

// Маршруты
app.use('/', indexRouter);
app.use('/', adminPanelRouter);
app.use('/', adminLoginRouter);
app.use('/', apiAdminLoginRouter);
app.use('/', apiUpdateVideoRouter);
app.use('/', apiUpdateSlideRouter);
app.use('/', apiDropSlideRouter);
app.use('/', apiUpdatePartnerRouter);
app.use('/', apiDropPartnerRouter);
app.use('/', apiDropVideoRouter);

// Обработка 404 и ошибок
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
