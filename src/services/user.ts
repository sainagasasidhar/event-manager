import  fs from 'fs';
import bcrypt from 'bcrypt'
import uuid from 'uuid';
let users = require('../data/users.json');

type event = {
    id : string
    name:  string,
    category: string,
    eventType: string
    paymentStatus : string;
}
type user = {
    id: string;
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    locate:string;
    role: string;
    eventsregistered: event[];
}
type response = {
    response :string;
    status: number;
}
function createUser (input: user): response {
    let res = {response:"",status:400};
    input.password = bcrypt.hashSync(input.password,8);
    input.id = uuid.v4();
    return res;
}

export default function findUserById (id:string): any {
    let userById= users.filter(function(userIn:user) {
        return userIn.id == id;
    });
    return userById[0];
}

export const findUserByEmail = (email:string):any =>{
    let userByEmail= users.filter(function(userIn:user) {
        return userIn.email == email;
    });
    return userByEmail[0];
}