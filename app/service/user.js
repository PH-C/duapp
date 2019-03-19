'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5')
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class UserService extends Service {
  async create(user) {
    const {
      ctx,
    } = this;
    try {
      if (!user.username || !user.password) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `expected an object with username, password but got: ${JSON.stringify(user)}`,
        });
      }
      const md5Passwd = md5(user.password)
      user = Object.assign(user, {
        password: md5Passwd,
      });
      const userDB = await ctx.model.User.findOne({
        where: {
          username: user.username,
        },
      });
      if (!userDB) {
        const res = await this.ctx.model.User.create(user);
        ctx.status = 201;
        return Object.assign(SUCCESS, {
          data: res,
        });
      }
      ctx.status = 406;
      return Object.assign(ERROR, {
        msg: 'username already exists',
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async del(id) {
    const {
      ctx,
    } = this;
    try {
      const user = await ctx.model.User.findById(id);
      if (!user) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      user.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: user,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, user }) {
    const {
      ctx,
    } = this;
    try {
      const userDB = await ctx.model.User.findById(id);
      if (!userDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      const md5Passwd = md5(user.password)
      user = Object.assign(user, {
        password: md5Passwd,
      });
      const res = await userDB.update(user);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async recharge({
    money = 0
  }) {
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
      const userDB = await ctx.model.User.findById(user.id);
      if (!userDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }

      if(money){
        money = money + userDB.money
      }
     
      const res = await userDB.update({ money: money});
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg:"充值成功!"
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async pay({
    money = 0
  }){
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
      const userDB = await ctx.model.User.findById(user.id);
      if (!userDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }

      
      money = userDB.money - money 
      if(money<0){
        return {...ERROR,msg:"余额不足，请充值！"}
      }
    
      const res = await userDB.update({ money: money});
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
        msg:"支付成功!"
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async login({ username, password }) {
    const {
      ctx,
    } = this;
    try {
      const user = await ctx.model.User.findOne({
        where: {
          username: username.toString()
        },
      });
      if (!user) {
        return Object.assign(ERROR, {
          msg: 'username is error',
        });
      }
      if (md5(password) === user.password) {
        ctx.status = 200;
        const hash = md5.hex(password)
        // ctx.cookies.set('token', hash, {
        //   httpOnly: false,
        //   signed: false,
        //   maxAge: 3600 * 1000,
        //   path: '/',
        // });
        ctx.session.user = user;

        // ctx.cookies.set('user_id', user.id, {
        //   httpOnly: false,
        //   signed: false,
        //   maxAge: 3600 * 1000,
        //   path: '/',
        // });
        return Object.assign(SUCCESS, {
          data: Object.assign(user, {
            password: '',
          }),
        });
      }
      return Object.assign(ERROR, {
        msg: 'password is error',
      });


    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async find(id) {
    const {
      ctx,
    } = this;
    try {
      const user = await ctx.model.User.findById(id, {
        include: [{
          model: ctx.model.Authority,
          attributes: [ 'id', 'name' ],
        }],
      });
      if (!user) {
        ctx.status = 401;
        return Object.assign(ERROR, {
          msg: 'user not found',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: user,
      });

    } catch (error) {
      throw (500);
    }
  }
}

module.exports = UserService;
