'use strict';
const hw = require('./router/hw')
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  hw(app)
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
