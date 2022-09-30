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
exports.getUser = exports.loginUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const auth_2 = require("../services/auth");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newUser = req.body;
    if (newUser.email && newUser.password) {
        let hashedPassword = yield (0, auth_1.hashPassword)(newUser.password);
        newUser.password = hashedPassword;
        let created = yield user_1.User.create(newUser);
        res.status(201).json({
            email: created.email,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Email and password required');
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let existingUser = yield user_1.User.findOne({
        where: { email: req.body.email }
    });
    if (existingUser) {
        let passwordsEqual = yield (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        if (passwordsEqual) {
            let token = yield (0, auth_2.signUserToken)(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Password denied');
        }
    }
    else {
        res.status(401).json('Forgot your email?');
    }
});
exports.loginUser = loginUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield (0, auth_1.verifyUser)(req);
    console.log(user);
    // res.json(user)
    if (user) {
        let { email, firstName, lastName, city, createdAt, updatedAt } = user;
        res.status(200).json({
            email,
            firstName,
            lastName,
            city,
            createdAt,
            updatedAt
        });
    }
    else {
        res.status(401).send("did not work");
    }
});
exports.getUser = getUser;
