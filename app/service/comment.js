'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class CommentService extends Service {
  async create({
    topic_id,
    content,
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
      if (!content || !topic_id) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `expected an object with content,Topic_id but got: ${JSON.stringify({
            topic_id,
            content,
          })}`,
        });
      }
    
      const Topic = await ctx.model.Topic.findById(topic_id);
      if(!Topic){
        return {...ERROR,msg:"未找到要评论的话题"}
      }

      const res = await ctx.model.Comment.create({
        user_id:user.id,
        topic_id,
        content,
      });
      ctx.status = 201;

      Topic.increment('commentSize').then().catch(err => {
        console.log(err);
      });
     
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async del({
    id,
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
    const user_id = user.id;

    try {
      const comment = await ctx.model.Comment.findById(id);
      // const user = await ctx.model.User.findById(user_id);
      if (!comment) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'comment is not exists',
        });
      }
     
      const Topic = await ctx.model.Topic.findById(comment.topic_id);
      const res = await comment.destroy();
      Topic.decrement('commentSize').then().catch(err => {
        console.log(err);
      });
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async praise({
    id,
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
    // const user_id = user.id;

    const comment = await ctx.model.Comment.findById(id);
    if (!comment) {
      ctx.status = 400;
      return Object.assign(ERROR, {
        msg: 'comment is not exists',
      });
    }

    comment.increment('like').then().catch(err => {
      console.log(err);
    });

    ctx.status = 200;
    return Object.assign(SUCCESS, {
      msg: "点赞成功!",
    });
   

  }
}

module.exports = CommentService;
