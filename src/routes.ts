import Router from 'express';
import verifyToken from './middleware/jwt-authentication';
import userInputValidator,{userLoginValidation} from './validator/input-validator';
import createUser from './services/user';

const router = Router();

router.post('users/signup', (req, res) => {
    if (!userInputValidator(req.body)) {
        return res.status(400).json("User Input Validation Failed");
    } else {
        let res = createUser(req.body)
        if (res) {
            return res.status(200).json(res);
        } else {
            return res.status(500).json("Server Response Is Failed");
        }
    }
})

router.post('users/login', verifyToken, (req, res) => {

})

router.post('/events', verifyToken, (req, res) => {
    
})

router.put('events/:id', verifyToken, (req, res) => {
    
})

router.post('events/:id/register', verifyToken, (req, res) => {
    
})
export default router;