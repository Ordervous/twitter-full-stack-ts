import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { TweetFactory } from "./tweet";
import { AssociateUserTweets } from "./tweet";

const dbName = 'twitterDB';
const username = 'root';
const password = 'Password1!';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

TweetFactory(sequelize);
UserFactory(sequelize);
AssociateUserTweets();

export const db = sequelize;