import findUserByEmail from '../services/user';
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

export default function userInputValidator(input:any) : boolean {
    if(input) {
        let emailregex = "/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$";
        if (!input.email) return false;
        if (!input.password) return false;
        if (!input.firstname) return false;
        if (!input.lastname) return false;
        if (!input.email.match(emailregex)) return false;
        else return true;
    } else {
        return false;
    }
};
export function userLoginValidation(input:any):any {
    if (input) {
       let userFound = findUserByEmail (input.email)
       if (userFound) {
            bcrypt.compareSync(input.password, userFound.password)
            let token = jwt.sign({id: userFound.id,role:userFound.role}, "user_signin", {expiresIn: 86400});
            return {token: token, statusCode:200};
       } else {
        return {message:"user not found" , statusCode:400};
       }
    } else {
        return {message:"please enter emailid and password" , statusCode:400};
    }
};