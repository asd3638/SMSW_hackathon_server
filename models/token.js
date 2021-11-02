const Sequelize = require("sequelize");

module.exports = class Token extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        accessToken: {
          type: Sequelize.STRING(200),
          allowNull: true,
          unique: true,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Token",
        tableName: "tokens",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
