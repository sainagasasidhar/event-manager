"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.createUser = void 0;
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuidv4_1 = require("uuidv4");
const users_json_1 = __importDefault(require("../../data/users.json"));
function createUser(input) {
    let usersArr = new Array();
    if (users_json_1.default) {
        usersArr = users_json_1.default;
    }
    // let res = {response:"",status:400};
    input.password = bcrypt_1.default.hashSync(input.password, 8);
    input.id = (0, uuidv4_1.uuid)();
    usersArr.push(input);
    fs_1.default.writeFileSync('data/users.json', JSON.stringify(usersArr, null, 4), { encoding: 'utf8', flag: 'w' });
    return input;
}
exports.createUser = createUser;
function findUserById(id) {
    let userById = users_json_1.default.filter((userById) => {
        return userById.id == id;
    });
    return userById[0];
}
exports.default = findUserById;
function findUserByEmail(email) {
    let userByEmail = users_json_1.default.filter((userByEmail) => {
        return userByEmail.email == email;
    });
    return userByEmail[0];
}
exports.findUserByEmail = findUserByEmail;
