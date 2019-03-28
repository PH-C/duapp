'use strict';

module.exports = app => {
  app.post('/api/users/comment', 'comment.create');
  app.put('/api/comment/praise/:id', 'comment.praise')
  app.del('/api/users/comment/:id', 'comment.destroy');
};
