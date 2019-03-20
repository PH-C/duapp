'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    FLOAT,
  } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
    },
    password: {
      type: STRING,
    },
    avatar: {
      type: STRING, 
    },
    money: {
      type: FLOAT,
      allowNull: false, 
      defaultValue: 0
    },
    created_at: DATE,
    updated_at: DATE,
  });

  User.associate = function() {
    app.model.User.hasMany(app.model.Topic, {
      as: 'topics',
    });
    app.model.User.hasMany(app.model.Comment, {
      as: 'comments',
    });
    app.model.User.hasMany(app.model.Collect, {
      as: 'collects',
    });
    app.model.User.hasMany(app.model.UserSell, {
      as: 'usersells',
    });
    app.model.User.belongsTo(app.model.Authority);
  };

  return User;
};
