export class GetUserDto{
    constructor(userDB){
        this.fullName = userDB.fullName;
        this.email = userDB.email;
        this.age = userDB.age;
    }
}