'use strict';

module.exports = app => {
  app.get('/api/userorder', 'userOrder.index');
  app.post('/api/userorder', 'userOrder.create');
  app.get('/api/userorder/:id', 'userOrder.find');
  app.get('/api/userorder/:id/edit', 'userOrder.edit');

  app.get('/api/users/userorder', 'userOrder.findCurrentUserOrder');
  app.del('/api/users/userorder/:id', 'userOrder.destroy');
  app.put('/api/users/userorder/:id', 'userOrder.update');
  
};
