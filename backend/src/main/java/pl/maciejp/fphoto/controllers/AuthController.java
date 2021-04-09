package pl.maciejp.fphoto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.maciejp.fphoto.models.User;
import pl.maciejp.fphoto.payload.request.LoginRequest;
import pl.maciejp.fphoto.payload.request.RegisterRequest;
import pl.maciejp.fphoto.payload.response.MessageResponse;
import pl.maciejp.fphoto.repositories.UserRepository;


@RestController
@CrossOrigin("http://localhost:8081")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
        if(userRepository.existsByLogin(registerRequest.getLogin())){
            return ResponseEntity.badRequest().body(new MessageResponse("User with this login already exists"));
        }

        if(userRepository.existsByEmail(registerRequest.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("User with this email already exists"));
        }

        User user = new User(
                registerRequest.getLogin(),
                encoder.encode(registerRequest.getPassword()),
                registerRequest.getEmail()
        );

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registrated!"));
    }

    @GetMapping("/user")
    public User user(String login){
        User user = userRepository.findFirstByLogin("dawid");


        return user;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest){

        User user = userRepository.findFirstByLogin(loginRequest.getLogin());
        return ResponseEntity.ok(new MessageResponse("User logged in"));
    }
}
