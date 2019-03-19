'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    FLOAT,
    BOOLEAN,
  } = app.Sequelize;

  const UserSell = app.model.define('usersell', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    size: {
      type: STRING,
    },
    price: {
      type: FLOAT,
    },
    created_at: DATE,
    updated_at: DATE,
    sellState:{
      type: INTEGER,
      allowNull: false, 
      defaultValue: 0
    }
  });

  UserSell.associate = function() {
    app.model.UserSell.belongsTo(app.model.User);
    app.model.UserSell.belongsTo(app.model.Product);
  };

  return UserSell;
};
