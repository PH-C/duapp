'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    TEXT,
    DATE,
    BOOLEAN
  } = app.Sequelize;

  const Product = app.model.define('product', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      validate: {
        min: 1,
        max: 50,
      },
    },
    pic: {
      type: STRING,
    },
    articleNumber:{
      type: STRING,
      validate: {
        min: 1,
        max: 255,
      },
    },
    describe: {
      type: TEXT,
    },
    brand:{
      type: STRING,
      validate: {
        min: 1,
        max: 255,
      },
    },
    series:{
      type: STRING,
      validate: {
        min: 1,
        max: 255,
      },
    },
    readSize: {
      type: INTEGER,
      defaultValue: 0,
    },
    isHot: {
      type: BOOLEAN,
      allowNull: false, 
      defaultValue: false
    },
    isRecommend: {
      type: BOOLEAN,
      allowNull: false, 
      defaultValue: false
    },
    tags: {
      type: STRING(100),
    },
    created_at: DATE,
    updated_at: DATE,

  });

  Product.associate = function() {
    app.model.Product.hasMany(app.model.UserSell, {
      as: 'sellist',
    });
  };

 
  return Product;
};
