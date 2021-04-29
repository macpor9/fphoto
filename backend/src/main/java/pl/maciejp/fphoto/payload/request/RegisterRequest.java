package pl.maciejp.fphoto.payload.request;

public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private Integer starterId;

    public Integer getStarterId() {
        return starterId;
    }

    public void setStarterId(Integer starterId) {
        this.starterId = starterId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}