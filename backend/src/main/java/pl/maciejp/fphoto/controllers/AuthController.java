package pl.maciejp.fphoto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.maciejp.fphoto.models.User;
import pl.maciejp.fphoto.payload.request.RegisterRequest;
import pl.maciejp.fphoto.payload.response.MessageResponse;
import pl.maciejp.fphoto.repositories.UserRepository;

@RestController
@CrossOrigin("http://localhost:8081")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    UserRepository userRepository;


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
//        User user = new User(registerRequest);
        User user = new User(
                registerRequest.getLogin(),
                registerRequest.getPassword(),
                registerRequest.getEmail()
        );
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registrated!"));
    }
}
