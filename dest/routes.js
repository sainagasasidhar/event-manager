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
const express_1 = __importDefault(require("express"));
const jwt_authentication_1 = __importDefault(require("./middleware/jwt-authentication"));
const input_validator_1 = __importStar(require("./validator/input-validator"));
const user_1 = require("./services/user");
const router = (0, express_1.default)();
router.post('/users/signup', (req, res) => {
    if (!(0, input_validator_1.default)(req.body)) {
        return res.status(400).json("User Input Validation Failed");
    }
    else {
        let resp = (0, user_1.createUser)(req.body);
        if (resp) {
            return res.status(200).json(resp);
        }
        else {
            return res.status(500).json("Server Response Is Failed");
        }
    }
});
router.get('/users/signup', (req, res) => {
    return res.status(200).json("HEllo");
});
router.post('/users/login', (req, res) => {
    let resp = (0, input_validator_1.userLoginValidation)(req.body);
    return res.status(resp.statusCode).json(resp);
});
router.post('/events', jwt_authentication_1.default, (req, res) => {
    if (req.user) {
        return res.status(200).json(req.role);
    }
    else {
        return res.status(400).json(req.message);
    }
});
router.put('/events/:id', jwt_authentication_1.default, (req, res) => {
});
router.post('/events/:id/register', jwt_authentication_1.default, (req, res) => {
});
exports.default = router;
