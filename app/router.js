'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // user
  router.post('/api/users/signin', controller.users.signin);
  router.post('/api/users/signup', controller.users.signup);
  router.get('/api/users/signout', controller.users.signout);

  // 分类列表 GRUD 
  router.resources('categories', '/api/categories', controller.categories);

  // 文章
  router.resources('articles', '/api/articles', controller.articles);

  router.get('/api/articles/pv/:id', controller.articles.addPv);
  router.post('/api/articles/comment/:id', controller.articles.addComment);

};
