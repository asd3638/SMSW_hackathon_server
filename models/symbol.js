const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      store_id:{
        type: Sequelize.INTEGER(40),
        allowNull: false,
      },
      symbol_type:{
        type: Sequelize.STRING(50),
        allowNull: false,
      },   
      content: {
        type: Sequelize.STRING(200),
        allowNull: true,
      }},
      
     {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Symbol',
      tableName: 'symbols',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db){
    db.Symbol.belongsTo(db.Store, {foreignKey: 'store_id', targetKey: 'id'});
  }
};