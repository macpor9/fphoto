export default class User{
    constructor(starterId,username,email,password,repeatPassword) {
        this.starterId = starterId;
        this.username = username;
        this.password = password;
        this.repeatPassword = repeatPassword
        this.email = email;
    }
}