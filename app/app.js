var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var helmet = require('helmet');
var log4js = require('log4js');
var indexRouter = require('./routes/index');
var adminPanelRouter = require('./routes/adminpanel');
var adminLoginRouter = require('./routes/adminlogin');
var apiAdminLoginRouter = require('./routes/api_adminlogin');
var apiUpdateVideoRouter = require('./routes/api_updatevideo');
var apiUpdateSlideRouter = require('./routes/api_updateslide');
var apiDropSlideRouter = require('./routes/api_dropslide');
var apiUpdatePartnerRouter = require('./routes/api_updatepartner');
var apiDropPartnerRouter = require('./routes/api_droppartner');
var apiDropVideoRouter = require('./routes/api_dropvideo');
var config = require('./config')();
require('dotenv').config();


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

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

app.use((req, res, next) => {
  var logger = log4js.getLogger();
  req.logger = logger;
  next();
});
//app.use(helmet());
/*app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);
*/
//app.use(helmet.xssFilter());
//app.use(helmet.noSniff());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));
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
