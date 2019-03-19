'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
  unique,
} = require('../util/util');
class UserOrderService extends Service {
  async create(UserOrder) {
    const {
      ctx,
    } = this;
    const user = this.ctx.session.user;
    console.log("userId", user)
    if(!user) {
      return {
        code:400,
        msg:"未登录"
      }
    }

    try {
      const res = await this.ctx.model.UserOrder.create({...UserOrder, user_id:user.id});
      //下单后需要更新卖单的状态由未出售到未发货
      const usersell = await this.ctx.model.UserSell.findById(UserOrder.usersell_id);
      usersell.update({
        sellState:1
      });
      return Object.assign({
        data: res,
      }, SUCCESS);
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async index({
    page = 1,
    pageSize = 10,
    state = '',
    order_by = 'created_at',
    order = 'DESC',
  }) {
   
    const {
      Op,
    } = this.app.Sequelize;

    pageSize = pageSize || 10                           //一页多少条
    const currentPage = page || 1                  //设置当前页默认第一页
    const skipNum = (currentPage - 1) * pageSize   //跳过数

    let options = {
      offset: parseInt(skipNum),
      limit: parseInt(pageSize),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
      where: {}
    };
    
    if (state) {
      options.where = {
        ...options.where,
        orderState:state
      }
    }

    console.log("options", options)
   
    const res = await this.ctx.model.UserOrder.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      },{
        model: this.ctx.model.UserSell,
        as: 'usersell',
        include:[{
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username' ],
        },{
          model: this.ctx.model.Product,
          as: 'product'
        }]
      }],
    }));
    return Object.assign(SUCCESS, {
      data: res,
    });
  }

  async findCurrentUserOrder({
    page = 1,
    pageSize = 10,
    state = '',
    order_by = 'created_at',
    order = 'DESC',
  }){
    const {
      Op,
    } = this.app.Sequelize;
    const user = this.ctx.session.user;
    console.log("userId", user)
    if(!user) {
      return {
        code:400,
        msg:"未登录"
      }
    }

    pageSize = pageSize || 10                           //一页多少条
    const currentPage = page || 1                  //设置当前页默认第一页
    const skipNum = (currentPage - 1) * pageSize   //跳过数

    let options = {
      offset: parseInt(skipNum),
      limit: parseInt(pageSize),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
      where: {
        user_id:user.id
      }
    };
    
    if (state) {
      options.where = {
        ...options.where,
        orderState:state
      }
    }

    console.log("options", options)
    const res = await this.ctx.model.UserOrder.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      },{
        model: this.ctx.model.UserSell,
        as: 'usersell',
        include:[{
          model: this.ctx.model.User,
          as: 'user',
          attributes: [ 'id', 'username' ],
        },{
          model: this.ctx.model.Product,
          as: 'product'
        }]
      }],
    }));
    return Object.assign(SUCCESS, {
      data: res,
    });
  }

  async del({
    id,
  }) {
    const user = this.ctx.session.user;
    console.log("userId", user)
    if(!user) {
      return {
        code:400,
        msg:"未登录"
      }
    }
    const UserOrder = await this.ctx.model.UserOrder.findById(id);
    if (!UserOrder) {
      return Object.assign(ERROR,{
        msg: 'UserOrder not found',
      });
    }
    UserOrder.destroy();
    return SUCCESS;

  }

  async update({
    id,
    updates,
  }) {
    const user = this.ctx.session.user;
    console.log("userId", user)
    if(!user) {
      return {
        code:400,
        msg:"未登录"
      }
    }
    const UserOrder = await this.ctx.model.UserOrder.findById(id);
    if (!UserOrder) {
      return Object.assign(ERROR, {
        msg: 'UserOrder not found',
      });
    }
    UserOrder.update(updates);
    return SUCCESS;

  }

  async find(id) {
    const UserOrder = await this.ctx.model.UserOrder.findById(id,{
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
        include: [{
          model: this.ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      },{
        model: this.ctx.model.Product,
        as: 'product'
      }],
    });
  
    if (!UserOrder) {
      return Object.assign(ERROR, {
        msg: 'UserOrder not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: UserOrder,
    });

  }

  async edit(id) {
    const UserOrder = await this.ctx.model.UserOrder.findById(id);
    if (!UserOrder) {
      return Object.assign(ERROR, {
        msg: 'UserOrder not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: UserOrder,
    });

  }

 
}

module.exports = UserOrderService;
