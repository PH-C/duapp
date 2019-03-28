'use strict';

module.exports = app => {
  app.post('/api/address', 'address.create');
  app.get('/api/address', 'address.list');
  app.del('/api/address/:id', 'address.destroy');
  app.get('/api/address/:id', 'address.find');
  app.put('/api/address/:id', 'address.update');
  app.get('/api/users/address', 'address.currentUserAddresslist')
};
