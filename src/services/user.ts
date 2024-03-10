import  fs from 'fs';
import bcrypt from 'bcrypt'
import uuid from 'uuid';
import users from '../../data/users.json';

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
export function createUser (input: user): user {
    let usersArr = new Array<user>();
    if (users) {
        usersArr = users;
    }
    // let res = {response:"",status:400};
    input.password = bcrypt.hashSync(input.password,8);
    input.id = uuid.v4();
    usersArr.push(input);
    fs.writeFileSync('data/users.json', JSON.stringify(users,null,4), {encoding: 'utf8', flag: 'w'});
    return input;
}

export default function findUserById (id:string): any {
    let userById= users.filter(function(userIn:user) {
        return userIn.id == id;
    });
    return userById[0];
}

export function findUserByEmail (email:string) {
    let userByEmail= users.filter(function(userIn:user) {
        return userIn.email == email;
    });
    return userByEmail[0];
}