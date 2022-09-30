import { Router } from 'express';
import { createTweet, deleteTweet, getAllTweets, 
    getTweet, updateTweet } from '../controllers/tweetController';

const router = Router();

router.get('/', getAllTweets);

router.post('/', createTweet);

router.get('/:tweetId', getTweet);

router.put('/:tweetId', updateTweet);

router.delete('/:tweetId', deleteTweet);

export default router;