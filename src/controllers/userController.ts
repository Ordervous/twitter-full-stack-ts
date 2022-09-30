import { RequestHandler } from "express";
import { User } from "../models/user";
import { comparePasswords, hashPassword, verifyUser } from "../services/auth";
import { signUserToken } from "../services/auth";

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body;
    if (newUser.email && newUser.password) {
        let hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;
        let created = await User.create(newUser);
        res.status(201).json({
            email: created.email,
            userId: created.userId
        });
    } else {
        res.status(400).send('Email and password required');
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    let existingUser: User | null = await User.findOne({
        where: { email: req.body.email }
    })

    if (existingUser) {
        let passwordsEqual = await comparePasswords(req.body.password, existingUser.password);
    
    if (passwordsEqual) {
        let token = await signUserToken(existingUser);
        res.status(200).json({ token });
    } 
    else {
        res.status(401).json('Password denied');
    }
    
    }
    else {
        res.status(401).json('Forgot your email?')
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    console.log(user)

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
}