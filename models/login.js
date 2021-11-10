const Sequelize = require("sequelize");

module.exports = class Login extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        username: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Login",
        tableName: "logins",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
