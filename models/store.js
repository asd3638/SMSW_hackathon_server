const Sequelize = require("sequelize");

module.exports = class Token extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name:{
            type: Sequelize.STRING(40),
            allowNull: false,
        },
        lat: {
          type: Sequelize.FLOAT(30),
          allowNull: true,
        },
        lng: {
          type: Sequelize.FLOAT(30),
          allowNull: false,
        },
        img: {
            type: Sequelize.TEXT,
            allowNull: false,
        }

      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Store",
        tableName: "stores",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db){
    db.Store.hasMany(db.Coupon, { foreignKey: 'store_id', sourceKey: 'id'}); 
  } 

};
