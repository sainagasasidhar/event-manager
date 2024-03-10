"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../services/user"));
function verifyToken(req, res, next) {
    if (req.headers && req.headers.authorization) {
        jsonwebtoken_1.default.verify(req.headers.authorization, "user_signin", function (err, decode) {
            if (err) {
                req.user = undefined;
                req.message = "Header verification failed";
                next();
            }
            else {
                let id = decode.id;
                let userName = (0, user_1.default)(id);
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
}
exports.default = verifyToken;
