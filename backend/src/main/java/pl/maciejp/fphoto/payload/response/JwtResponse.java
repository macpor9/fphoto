package pl.maciejp.fphoto.payload.response;

public class JwtResponse {
    private String token;
    private int id;
    private String login;
    private String email;

    public JwtResponse(String accessToken, int id, String login, String email) {
        this.token = accessToken;
        this.id = id;
        this.login = login;
        this.email = email;
    }

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String login() {
        return login;
    }

    public void login(String login) {
        this.login = login;
    }

}