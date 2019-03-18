'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
  unique,
} = require('../util/util');
class UserSellService extends Service {
  async create(UserSell) {
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
      const res = await this.ctx.model.UserSell.create({...UserSell, user_id:user.id});
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
        sellState:state
      }
    }

    console.log("options", options)
   
    const res = await this.ctx.model.UserSell.findAndCountAll(options);
    return Object.assign(SUCCESS, {
      data: res,
    });
  }

  async findCurrentUserSell({
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
        sellState:state
      }
    }

    console.log("options", options)
   
    const res = await this.ctx.model.UserSell.findAndCountAll(Object.assign(options, {
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
    const UserSell = await this.ctx.model.UserSell.findById(id);
    if (!UserSell) {
      return Object.assign({
        error_msg: 'UserSell not found',
      }, ERROR);
    }
    UserSell.destroy();
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
    const UserSell = await this.ctx.model.UserSell.findById(id);
    if (!UserSell) {
      return Object.assign(ERROR, {
        msg: 'UserSell not found',
      });
    }
    UserSell.update(updates);
    return SUCCESS;

  }

  async find(id) {
    const UserSell = await this.ctx.model.UserSell.findById(id,{
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
  
    if (!UserSell) {
      return Object.assign(ERROR, {
        msg: 'UserSell not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: UserSell,
    });

  }

  async edit(id) {
    const UserSell = await this.ctx.model.UserSell.findById(id);
    if (!UserSell) {
      return Object.assign(ERROR, {
        msg: 'UserSell not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: UserSell,
    });

  }

 
}

module.exports = UserSellService;
