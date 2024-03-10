"use strict";
let jwtToken = require('jsonwebtoken');
const user = require('../services/user.ts');
const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        jwtToken.verify(req.headers.authorization, "user_signin", function (err, decode) {
            if (err) {
                req.user = undefined;
                req.message = "Header verification failed";
                next();
            }
            else {
                let id = decode.id;
                let userName = user.findUserById(id);
                req.user = userName;
                next();
            }
        });
    }
    else {
        req.user = undefined;
        req.message = "Authorization header not found";
        next();
    }
};
module.exports = verifyToken;
