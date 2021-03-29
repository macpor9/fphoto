package pl.maciejp.fphoto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.maciejp.fphoto.Structures.UserStructure;
import pl.maciejp.fphoto.models.User;
import pl.maciejp.fphoto.repositories.UserRepository;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:8081/")
@RequestMapping("/api/data")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user")
    public List<User> userList(String login){
        List<User> userList = userRepository.findById(1);

        return userList;
    }

    @GetMapping(value="/", produces = MediaType.TEXT_PLAIN_VALUE)
    public String index() {
        List<User> userList = userRepository.findByLogin("user1");

        return userList.get(0).getLogin();
    }


}
