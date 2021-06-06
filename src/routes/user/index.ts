import express from 'express';
import {getProfileById, login, register, updateProfileById} from '../../controllers'

const router = express.Router();

router.get('/:id', getProfileById); 
router.put('/:id', updateProfileById);

router.post('/register',register);
router.post('/login', login) 



export default router;