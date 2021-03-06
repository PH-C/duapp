'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    FLOAT,
  } = app.Sequelize;

  const UserOrder = app.model.define('userorder', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    originalPrice:{
      type: FLOAT,
    },
    price: {
      type: FLOAT,
    },
    orderState:{
      type: INTEGER,
      allowNull: false, 
      defaultValue: 1
    },
    address:{
      type: STRING
    },
    created_at: DATE,
    updated_at: DATE,
  });

  UserOrder.associate = function() {
    app.model.UserOrder.belongsTo(app.model.User);
    app.model.UserOrder.belongsTo(app.model.UserSell);
  };

  return UserOrder;
};
