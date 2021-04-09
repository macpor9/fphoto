package pl.maciejp.fphoto.models;

import pl.maciejp.fphoto.payload.request.RegisterRequest;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column()
    private String login;

    @Column
    private String password;

    @Column
    private String email;

    public User(){};

    public User(String login, String password, String email){
        this.login = login;
        this.password = password;
        this.email = email;
    }

//    public User(RegisterRequest registerRequest){
//        this.login = registerRequest.getLogin();
//        this.password = registerRequest.getPassword();
//        this.email = registerRequest.getEmail();
//    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
