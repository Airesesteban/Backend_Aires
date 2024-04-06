export class GetUserDto{
    constructor(userDB){
        this.fullName = userDB.first_name + ' ' + userDB.last_name;
        this.email = userDB.email;
        this.roles = userDB.roles;
    }
}