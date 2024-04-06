export class GetUserDto{
    constructor(userDB){
        this.fullName = userDB.fullName;
        this.email = userDB.email;
        this.roles = userDB.roles;
    }
}