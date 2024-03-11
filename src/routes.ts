import Router from 'express';
import verifyToken from './middleware/jwt-authentication';
import userInputValidator,{userLoginValidation} from './validator/input-validator';
import {createUser,findUserByEmail} from './services/user';

const router = Router();

router.post('/users/signup', (req, res) => {
    if (!userInputValidator(req.body)) {
        return res.status(400).json("User Input Validation Failed");
    } else {
        let resp = createUser(req.body)
        if (resp) {
            return res.status(200).json(resp);
        } else {
            return res.status(500).json("Server Response Is Failed");
        }
    }
})

router.get('/users/signup', (req, res) => {
    return res.status(200).json("HEllo");
})

router.post('/users/login', (req, res) => {
    let resp = userLoginValidation(req.body)
    return res.status(resp.statusCode).json(resp);
})

router.post('/events', verifyToken, (req:any, res) => {
    if (req.user) {
        return res.status(200).json(req);
    } else {
        return res.status(400).json(req.message);
    }
})

router.put('/events/:id', verifyToken, (req, res) => {
    
})

router.post('/events/:id/register', verifyToken, (req, res) => {
    
})
export default router;