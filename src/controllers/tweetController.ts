import { RequestHandler } from 'express'
import { User } from '../models/user'
import { Tweet } from '../models/tweet'
import { verifyUser } from '../services/auth'

export const getAllTweets: RequestHandler = async (req, res, next) => {
  let tweets = await Tweet.findAll()
  res.status(200).json(tweets)
}

export const createTweet: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req)

  if (!user) {
    return res.status(403).send('Sign in to post a tweet')
  }

  let newTweet: Tweet = req.body
  newTweet.userId = user.userId

  if (newTweet.content) {
    let created = await Tweet.create(newTweet)
    res.status(201).json(created)
  } else {
    res.status(400).send('Write something to post')
  }
}

export const getTweet: RequestHandler = async (req, res, next) => {
  let tweetId = req.params.tweetId
  let tweet = await Tweet.findByPk(tweetId)
  if (tweet) {
    res.status(200).json(tweet)
  } else {
    res.status(404).json('No tweets here')
  }
}

export const getUserTweets: RequestHandler = async (req, res, next) => {
  let userId = req.params.userId
  let userTweets = await Tweet.findByPk(userId)

  if (userTweets) {
    let tweets = await Tweet.findAll({
        where: {
            userId: userId
        }
    })
    res.status(200).json(tweets)
    // res.status(200).json(userTweets)
  } else {
    res.status(404).json('User has no tweets')
  }
}



export const updateTweet: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req)

  if (!user) {
    return res.status(403).send()
  }

  let tweetId = req.params.tweetId
  let newTweet: Tweet = req.body

  let tweetFound = await Tweet.findByPk(tweetId)

  if (
    tweetFound &&
    tweetFound.tweetId &&
    tweetFound.userId == newTweet.tweetId &&
    newTweet.content &&
    user.userId
  ) {
    await Tweet.update(newTweet, {
      where: { tweetId: tweetId }
    })
    res.status(200).json('You are truly successful')
  } else {
    res.status(403).json('Bing Bang')
  }
}

export const deleteTweet: RequestHandler = async (req, res, next) => {
  let user: User | null = await verifyUser(req)

  if (!user) {
    return res.status(403).send()
  }

  let tweetId = req.params.tweetId
  let found = await Tweet.findByPk(tweetId)
  let newFound = req.params.userId

  if (found && found.tweetId && found.userId) {
    await Tweet.destroy({
      where: { tweetId: tweetId }
    })
    res.status(200).json()
  } else {
    res.status(404).json('Sorry, try again')
  }
}
