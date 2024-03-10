let jwtToken = require('jsonwebtoken');
const user = require('../services/user.ts');

const verifyToken = (req:any, res:any, next:any) => {
    if (req.headers && req.headers.authorization) {
        jwtToken.verify(req.headers.authorization, "user_signin", function(err:any, decode:any) {
            if (err) {
                req.user = undefined;
                req.message = "Header verification failed";
                next();
            } else {
                let id = decode.id;
                let userName = user.findUserById(id);
                req.user = userName;
                next();
            }
        })
    } else {
        req.user = undefined;
        req.message = "Authorization header not found";
        next();
    }
}

module.exports = verifyToken;