'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
  unique,
} = require('../util/util');
class ProductService extends Service {
  async create(Product) {
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
      const res = await this.ctx.model.Product.create(Product);
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
    brand = "",
    series = "",
    isHot = "",
    isRecommend = "",
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
    if (brand) {
      options.where = {
        ...options.where,
        brand: {
          [Op.like]: `%${brand}%`,
        },
      }
    }

    if (series) {
      options.where = {
        ...options.where,
        series: {
          [Op.like]: `%${series}%`,
        },
      }
    }

    if (isHot) {
      options.where = {
        ...options.where,
        isHot:isHot
      }
    }

    if (isRecommend) {
      options.where = {
        ...options.where,
        isRecommend:isRecommend
      }
    }

    console.log("options", options)
   
    const res = await this.ctx.model.Product.findAndCountAll(options);
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
    const Product = await this.ctx.model.Product.findById(id);
    if (!Product) {
      return Object.assign({
        error_msg: 'Product not found',
      }, ERROR);
    }
    Product.destroy();
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
    const Product = await this.ctx.model.Product.findById(id);
    if (!Product) {
      return Object.assign(ERROR, {
        msg: 'Product not found',
      });
    }
    Product.update(updates);
    return SUCCESS;

  }

  async find(id) {
    const Product = await this.ctx.model.Product.findById(id, {
      include: [{
        model: this.ctx.model.UserSell,
        as: 'sellist',
        where:{
          sellState:0
        },
        order: [
          ['price', 'ASC']
        ],
        separate: true,
       
        // attributes: [ 'id', 'username' ],
        // include: [{
        //   model: this.ctx.model.Authority,
        //   attributes: [ 'id', 'name' ],
        // }],
      }],
    });

    console.log("product", Product)
  
    if (!Product) {
      return Object.assign(ERROR, {
        msg: 'Product not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: Product,
    });

  }

  async edit(id) {
    const Product = await this.ctx.model.Product.findById(id);
    if (!Product) {
      return Object.assign(ERROR, {
        msg: 'Product not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: Product,
    });

  }

 
}

module.exports = ProductService;
