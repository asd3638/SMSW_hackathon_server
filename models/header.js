const Sequelize = require("sequelize");

module.exports = class Header extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        header: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Header",
        tableName: "headers",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
