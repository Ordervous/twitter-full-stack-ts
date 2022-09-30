import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Tweet extends Model<InferAttributes<Tweet>, InferCreationAttributes<Tweet>>{
    declare tweetId: number;
    declare content: string;
    declare userId: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function TweetFactory(sequelize: Sequelize) {
    Tweet.init({
        tweetId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        freezeTableName: true,
        tableName: 'tweets',
        sequelize
    });
}

export function AssociateUserTweets() {
    User.hasMany(Tweet, { foreignKey: 'userId' });
    Tweet.belongsTo(User, { foreignKey: 'userId' });
}