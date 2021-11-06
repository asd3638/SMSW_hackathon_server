const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nickname: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      sns_id: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      major: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
      student_id : {
        type: Sequelize.INTEGER(10),
        allowNull: true,
      }

    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db){
    db.User.hasMany(db.Token, {foreignKey: 'user_id', sourceKey: 'id'});
    db.User.hasMany(db.Coupon, {foreignKey: 'user_id', sourceKey: 'id'});
  }

};