"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidation = void 0;
const user_1 = __importDefault(require("../services/user"));
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
function userInputValidator(input) {
    if (input) {
        let emailregex = "/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$";
        if (!input.email)
            return false;
        if (!input.password)
            return false;
        if (!input.firstname)
            return false;
        if (!input.lastname)
            return false;
        if (!input.email.match(emailregex))
            return false;
        else
            return true;
    }
    else {
        return false;
    }
}
exports.default = userInputValidator;
;
function userLoginValidation(input) {
    if (input) {
        let userFound = (0, user_1.default)(input.email);
        if (userFound) {
            bcrypt.compareSync(input.password, userFound.password);
            let token = jwt.sign({ id: userFound.id, role: userFound.role }, "user_signin", { expiresIn: 86400 });
            return { token: token, statusCode: 200 };
        }
        else {
            return { message: "user not found", statusCode: 400 };
        }
    }
    else {
        return { message: "please enter emailid and password", statusCode: 400 };
    }
}
exports.userLoginValidation = userLoginValidation;
;
