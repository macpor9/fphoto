package pl.maciejp.fphoto.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.maciejp.fphoto.models.User;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findByUsername(String username);
    List<User> findById(int id);
    User findFirstByUsername(String login);
    Boolean existsByUsername(String login);
    Boolean existsByEmail(String email);
    Boolean existsByPassword(String password);

}
