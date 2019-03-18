'use strict';

module.exports = app => {
  app.get('/api/topic', 'topic.index');
  app.post('/api/topic', 'topic.create');
  app.get('/api/topic/:id', 'topic.find');
  app.get('/api/topic/:id/edit', 'topic.edit');
 
  app.del('/api/users/topic/:id', 'topic.destroy');
  app.put('/api/users/topic/:id', 'topic.update');
  
};
