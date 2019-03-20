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
    page = "",
    pageSize = "",
    state = '',
    order_by = 'created_at',
    order = 'DESC',
    start_date = '',
    end_date = ''
  }) {
   
    const {
      Op,
    } = this.app.Sequelize;

    let options = {
      order: [
        [ order_by, order.toUpperCase() ],
      ],
      where: {}
    };

    if(page && pageSize){
      pageSize = pageSize || 10                           //一页多少条
      const currentPage = page || 1                  //设置当前页默认第一页
      const skipNum = (currentPage - 1) * pageSize   //跳过数
      options.offset = parseInt(skipNum);
      options.limit = parseInt(pageSize);
    }
    
    if (state) {
      options.where = {
        ...options.where,
        orderState:state
      }
    }

    if(start_date && end_date){
      options.where = {
        ...options.where,
        created_at: {
          [Op.lt]: start_date,
          [Op.gt]: end_date
        }
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

    let allOrderPrice = await this.ctx.model.UserOrder.sum('price', {
      where:{...options.where}
    })

    return Object.assign(SUCCESS, {
      data: {
        ...res,
        allOrderPrice
      },
      
    });
  }

  async findCurrentUserOrder({
    page = 1,
    pageSize = 10,
    state = '',
    order_by = 'created_at',
    order = 'DESC',
    start_date = '',
    end_date = ''
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

    if(start_date && end_date){
      options.where = {
        ...options.where,
        created_at: {
          [Op.lt]: start_date,
          [Op.gt]: end_date
        }
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

    let allOrderPrice = await this.ctx.model.UserOrder.sum('price', {
      where:{...options.where}
    })

    return Object.assign(SUCCESS, {
      data: {
        ...res,
        allOrderPrice
      },
      
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
    //订单状态为3即买家确认收货同时将对应卖单的状态修改为3
    if(updates.orderState===3){
      const userSell = await this.ctx.model.UserSell.findById(UserOrder.usersell_id);
      userSell.update({
        sellState:updates.orderState
      })
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
