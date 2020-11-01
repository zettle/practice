'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/api/columns', controller.api.columns);
  router.get('/api/column', controller.api.column);
  router.get('/api/posts', controller.api.posts);
  router.post('/api/login', controller.api.login);
  router.post('/api/current/user', controller.api.user);

};
