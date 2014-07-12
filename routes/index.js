'use strict';

var log = require('lib/log')(module);
var config = require('config');
var requireTree = require('require-tree');
var controllers = requireTree('../controllers');

// Первым делом идут роуты для схем с жёстким началом /markup/* /task/*  и т.п.
// В конце идут роуты для статей и справочников, которые в корне сайта, например http://javascript.ru/String
// TODO: добавить обработку 404 Not Found, сделать возможность любому роуту легко вызывать ошибку 404, как и любую другую ошибку
module.exports = function(app) {

  app.get('/', controllers.frontpage.get);

  if (process.env.NODE_ENV == 'development') {
    app.get(/^\/markup\/(.*)/, controllers.markup.get);
  }

  app.get(/^\/task\/(.*)$/, controllers.task.get);

  app.get(/^\/(.*)$/, controllers.article.get);

};