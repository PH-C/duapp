'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async create() {
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.user.create(ctx.request.body);
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.user.del(id);
  }

  async findAll(){
    const {
      ctx,
    } = this;
    const res = await ctx.service.user.findAll(ctx.query);
    ctx.body = res;
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    const user = ctx.request.body;
    ctx.body = await ctx.service.user.update({
      id,
      user,
    });
  }

  async updateLoginUser(){
    const {
      ctx,
    } = this;
    const user = ctx.request.body;
    ctx.body = await ctx.service.user.updateLoginUser({
      user,
    });
  }

  async recharge(){
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    const user = ctx.request.body;
    ctx.body = await ctx.service.user.recharge(user);
  }

  async pay(){
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    const user = ctx.request.body;
    ctx.body = await ctx.service.user.pay(user);
  }

  async login() {
    const {
      ctx,
    } = this;
    const {
      username,
      password,
    } = ctx.request.body;
    ctx.body = await ctx.service.user.login({
      username,
      password,
    });
  }

  async adminLogin() {
    const {
      ctx,
    } = this;
    const {
      username,
      password,
    } = ctx.request.body;
    ctx.body = await ctx.service.user.adminLogin({
      username,
      password,
    });
  }

  async find() {
    const {
      ctx,
    } = this;
    const id = +ctx.params.id;
    ctx.body = await ctx.service.user.find(id);
  }

  async findLoginUser(){
    const {
      ctx,
    } = this;
    ctx.body = await ctx.service.user.findLoginUser();
  }
}

module.exports = UserController;
