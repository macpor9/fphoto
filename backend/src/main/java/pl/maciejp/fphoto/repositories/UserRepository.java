package pl.maciejp.fphoto.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.maciejp.fphoto.models.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    List<User> findById(int id);
    User findFirstByUsername(String login);
    Boolean existsByUsername(String login);
    Boolean existsByEmail(String email);
    Boolean existsByPassword(String password);

}
