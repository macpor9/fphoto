package pl.maciejp.fphoto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.maciejp.fphoto.models.User;
import pl.maciejp.fphoto.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:8081/")
@RequestMapping("/api/data")
public class UserController {
    @Autowired
    private UserRepository userRepository;


    @GetMapping(value="/", produces = MediaType.TEXT_PLAIN_VALUE)
    public String index() {
        Optional<User> user = userRepository.findByUsername("user1");

        return user.get().getUsername();
    }


}
