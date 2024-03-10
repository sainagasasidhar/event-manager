"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = __importDefault(require("uuid"));
let users = require('../data/users.json');
function createUser(input) {
    let res = { response: "", status: 400 };
    input.password = bcrypt_1.default.hashSync(input.password, 8);
    input.id = uuid_1.default.v4();
    return res;
}
function findUserById(id) {
    let userById = users.filter(function (userIn) {
        return userIn.id == id;
    });
    return userById[0];
}
exports.default = findUserById;
const findUserByEmail = (email) => {
    let userByEmail = users.filter(function (userIn) {
        return userIn.email == email;
    });
    return userByEmail[0];
};
exports.findUserByEmail = findUserByEmail;
