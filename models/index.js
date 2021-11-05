const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
//const env = "development";
const config = require("../config/config")[env];
const User = require("./user");
const Token = require("./token");
const Post = require('./post');

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    'host': config.host,
    'port': config.port,
    'dialect': config.dialect,
    logging: false
  }
);

db.sequelize = sequelize;
db.User = User;
db.Token = Token;
db.Post = Post;

User.init(sequelize);
Token.init(sequelize);
Post.init(sequelize);

User.associate(db)
Token.associate(db);
Post.associate(db);

module.exports = db;