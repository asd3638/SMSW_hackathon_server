const Sequelize = require("sequelize");

module.exports = class Token extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        store_id: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        user_id: {
          type: Sequelize.INTEGER(40),
          allowNull: false,
        },
        end_date: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        ifDeleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Coupon",
        tableName: "coupons",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Coupon.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
    db.Coupon.belongsTo(db.Store, { foreignKey: "store_id", targetKey: "id" });
  }
};
