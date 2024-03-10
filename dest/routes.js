"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_authentication_1 = __importDefault(require("./middleware/jwt-authentication"));
const input_validator_1 = __importDefault(require("./validator/input-validator"));
const user_1 = __importDefault(require("./services/user"));
const router = (0, express_1.default)();
router.post('users/signup', (req, res) => {
    if (!(0, input_validator_1.default)(req.body)) {
        return res.status(400).json("User Input Validation Failed");
    }
    else {
        let res = (0, user_1.default)(req.body);
        if (res) {
            return res.status(200).json(res);
        }
        else {
            return res.status(500).json("Server Response Is Failed");
        }
    }
});
router.post('users/login', jwt_authentication_1.default, (req, res) => {
});
router.post('/events', jwt_authentication_1.default, (req, res) => {
});
router.put('events/:id', jwt_authentication_1.default, (req, res) => {
});
router.post('events/:id/register', jwt_authentication_1.default, (req, res) => {
});
exports.default = router;
