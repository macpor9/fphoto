export default class User{
    constructor(starterId,login,email,password,repeatPassword) {
        this.starterId = starterId;
        this.login = login;
        this.password = password;
        this.repeatPassword = repeatPassword
        this.email = email;
    }
}