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
        attributes: [ 'id', 'username','avatar' ],
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

  async cancelSell({
    id,
  }) {
    const user = this.ctx.session.user;
    console.log("userId cancelSell", user)
    if(!user) {
      return {
        code:400,
        msg:"未登录"
      }
    }
    const UserSell = await this.ctx.model.UserSell.findById(id);
    console.log("UserSell.sellState", UserSell.sellState)
    if (!UserSell) {
      return Object.assign({
        error_msg: 'UserSell not found',
      }, ERROR);
    }
    
  
    if(parseInt(UserSell.sellState)>0){
      return {...ERROR,msg: '订单已经出售，不能撤回!',}
    }else{
      UserSell.destroy();
      return SUCCESS;
    }
   

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
    const userSell = await this.ctx.model.UserSell.findById(id);
    if (!userSell) {
      return Object.assign(ERROR, {
        msg: 'userSell not found',
      });
    }
    userSell.update(updates);
    //更新这个卖单对应的买单的状态。如果卖家更新状态为,未发货1，已发货对应状态为2，已完成3，
    //这里只允许卖家发货，卖家不能确认完成订单，买家确认收货后才完成订单
    if(updates.sellState===2){
      const userSellOrder = await this.ctx.model.UserOrder.findOne({
        where: {
          usersell_id: id
        }
      });
      userSellOrder.update({
        orderState:updates.sellState
      })
    }
    return SUCCESS;

  }

  async find(id) {
    const UserSell = await this.ctx.model.UserSell.findById(id,{
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username','avatar' ],
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
