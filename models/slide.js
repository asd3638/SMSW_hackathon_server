const Sequelize = require("sequelize");

module.exports = class Slide extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        slide: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Slide",
        tableName: "slides",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
