const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      boss: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      vegan: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      like: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      diet: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      store_id:{
        type: Sequelize.INTEGER(40),
        allowNull: false,
    },

    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Symbol',
      tableName: 'symbol',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db){
    db.Symbol.belongsTo(db.Store, {foreignKey: 'store_id', targetKey: 'id'});
  }

};