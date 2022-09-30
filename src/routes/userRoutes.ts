import { Router } from 'express';
import { getUserTweets } from '../controllers/tweetController';
import { createUser, getUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);

router.post('/login', loginUser);

router.get('/:userId', getUser);

router.get('/user/:userId', getUserTweets);

export default router;