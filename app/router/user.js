'use strict';

module.exports = app => {
  app.get('/api/users', 'user.findAll');
  app.get('/api/users/current', 'user.findLoginUser');
  app.post('/api/users/register', 'user.create');
  app.del('/api/users/:id', 'user.destroy');
  app.put('/api/users/recharge', 'user.recharge');
  app.put('/api/users/pay', 'user.pay');
  app.put('/api/users/current', 'user.updateLoginUser');
  app.put('/api/users/:id', 'user.update');
  app.post('/api/users/login', 'user.login');
  app.post('/api/users/adminlogin','user.adminLogin');
  
  app.get('/api/users/:id', 'user.find');
  app.get('/api/users/:id/edit', 'user.find');
};
