"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidation = void 0;
const user = __importStar(require("../services/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function userInputValidator(input) {
    if (input) {
        // let emailregex = "/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$";
        if (!input.email)
            return false;
        if (!input.password)
            return false;
        if (!input.firstname)
            return false;
        if (!input.lastname)
            return false;
        // if (!input.email.match(emailregex)) return false;
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
        let userFound = user.findUserByEmail(input.email);
        if (userFound) {
            bcrypt_1.default.compareSync(input.password, userFound.password);
            let token = jsonwebtoken_1.default.sign({ id: userFound.id, role: userFound.role }, "user_signin", { expiresIn: 86400 });
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
