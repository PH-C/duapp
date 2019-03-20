'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/home')(app);
  require('./router/topic')(app);
  require('./router/product')(app);
  require('./router/userSell')(app);
  require('./router/userOrder')(app);
  require('./router/collect')(app);
  require('./router/user')(app);
  require('./router/upload')(app);
  require('./router/comment')(app);
  
};
