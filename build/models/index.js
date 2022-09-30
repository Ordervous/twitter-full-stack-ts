"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
const tweet_1 = require("./tweet");
const tweet_2 = require("./tweet");
const dbName = 'twitterDB';
const username = 'root';
const password = 'Password1!';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
(0, tweet_1.TweetFactory)(sequelize);
(0, user_1.UserFactory)(sequelize);
(0, tweet_2.AssociateUserTweets)();
exports.db = sequelize;
