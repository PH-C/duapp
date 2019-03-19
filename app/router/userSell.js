'use strict';

module.exports = app => {
  app.get('/api/usersell', 'userSell.index');
  app.post('/api/usersell', 'userSell.create');
  app.get('/api/usersell/:id', 'userSell.find');
  app.get('/api/usersell/:id/edit', 'userSell.edit');

  app.get('/api/users/usersell', 'userSell.findCurrentUserSell');
  app.del('/api/users/usersell/cancel/:id', 'userSell.cancelSell')
  app.del('/api/users/usersell/:id', 'userSell.destroy');
  app.put('/api/users/usersell/:id', 'userSell.update');
};
