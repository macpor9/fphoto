package pl.maciejp.fphoto.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.maciejp.fphoto.models.User;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findByLogin(String login);
    List<User> findById(int id);
    User findFirstByLogin(String login);
    Boolean existsByLogin(String login);
    Boolean existsByEmail(String email);

}
