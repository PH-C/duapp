'use strict';

const Controller = require('egg').Controller;
class UserSellController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    const body = ctx.request.body;
    const created = await ctx.service.userSell.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = created;

  }

  async index() {
    const {
      ctx,
    } = this;
    const res = await ctx.service.userSell.index(ctx.query);
    ctx.body = res;
  }

  async findCurrentUserSell(){
    const {
      ctx,
    } = this;
    const res = await ctx.service.userSell.findCurrentUserSell(ctx.query);
    ctx.body = res;
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const res = await ctx.service.userSell.del({
      id,
    });
    ctx.status = 200;
    ctx.body = res;
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.userSell.update({
      id,
      updates: body,
    });
  }

  async find() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.userSell.find(id);
  }

  async edit() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.userSell.edit(id);
  }

}

module.exports = UserSellController;
