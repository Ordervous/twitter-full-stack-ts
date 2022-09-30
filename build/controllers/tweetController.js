"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTweet = exports.updateTweet = exports.getUserTweets = exports.getTweet = exports.createTweet = exports.getAllTweets = void 0;
const tweet_1 = require("../models/tweet");
const auth_1 = require("../services/auth");
const getAllTweets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let tweets = yield tweet_1.Tweet.findAll();
    res.status(200).json(tweets);
});
exports.getAllTweets = getAllTweets;
const createTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send('Sign in to post a tweet');
    }
    let newTweet = req.body;
    newTweet.userId = user.userId;
    if (newTweet.content) {
        let created = yield tweet_1.Tweet.create(newTweet);
        res.status(201).json(created);
    }
    else {
        res.status(400).send('Write something to post');
    }
});
exports.createTweet = createTweet;
const getTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let tweetId = req.params.tweetId;
    let tweet = yield tweet_1.Tweet.findByPk(tweetId);
    if (tweet) {
        res.status(200).json(tweet);
    }
    else {
        res.status(404).json('No tweets here');
    }
});
exports.getTweet = getTweet;
const getUserTweets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = req.params.userId;
    let userTweets = yield tweet_1.Tweet.findByPk(userId);
    if (userTweets) {
        let tweets = yield tweet_1.Tweet.findAll({
            where: {
                userId: userId
            }
        });
        res.status(200).json(tweets);
        // res.status(200).json(userTweets)
    }
    else {
        res.status(404).json('User has no tweets');
    }
});
exports.getUserTweets = getUserTweets;
const updateTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let tweetId = req.params.tweetId;
    let newTweet = req.body;
    let tweetFound = yield tweet_1.Tweet.findByPk(tweetId);
    if (tweetFound &&
        tweetFound.tweetId &&
        tweetFound.userId == newTweet.tweetId &&
        newTweet.content &&
        user.userId) {
        yield tweet_1.Tweet.update(newTweet, {
            where: { tweetId: tweetId }
        });
        res.status(200).json('You are truly successful');
    }
    else {
        res.status(403).json('Bing Bang');
    }
});
exports.updateTweet = updateTweet;
const deleteTweet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let tweetId = req.params.tweetId;
    let found = yield tweet_1.Tweet.findByPk(tweetId);
    let newFound = req.params.userId;
    if (found && found.tweetId && found.userId) {
        yield tweet_1.Tweet.destroy({
            where: { tweetId: tweetId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json('Sorry, try again');
    }
});
exports.deleteTweet = deleteTweet;
