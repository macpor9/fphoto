package pl.maciejp.fphoto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.maciejp.fphoto.models.User;
import pl.maciejp.fphoto.payload.request.LoginRequest;
import pl.maciejp.fphoto.payload.request.RegisterRequest;
import pl.maciejp.fphoto.payload.response.JwtResponse;
import pl.maciejp.fphoto.payload.response.MessageResponse;
import pl.maciejp.fphoto.repositories.UserRepository;
import pl.maciejp.fphoto.security.jwt.JwtUtils;
import pl.maciejp.fphoto.security.services.UserDetailsImpl;


@RestController
@CrossOrigin("http://localhost:8081")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;


    @PostMapping("/signup")
    @CrossOrigin("http://localhost:8081")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
        if(userRepository.existsByUsername(registerRequest.getUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("User with this login already exists"));
        }

        if(userRepository.existsByEmail(registerRequest.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("User with this email already exists"));
        }

        User user = new User(
                registerRequest.getUsername(),
                encoder.encode(registerRequest.getPassword()),
                registerRequest.getEmail()
        );

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registrated!"));
    }

    @GetMapping("/user")
    public User user(String username){
        User user = userRepository.findFirstByUsername("dawid");


        return user;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) throws UsernameNotFoundException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();



        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail()
                )
        );

    }
}
