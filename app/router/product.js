'use strict';

module.exports = app => {
  app.get('/api/product', 'product.index');
  app.post('/api/product', 'product.create');
  app.get('/api/product/:id', 'product.find');
  app.get('/api/product/:id/edit', 'product.edit');
 
  app.del('/api/users/product/:id', 'product.destroy');

  app.put('/api/users/product/:id', 'product.update');
  
};
