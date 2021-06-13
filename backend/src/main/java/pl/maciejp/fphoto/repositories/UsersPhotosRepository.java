package pl.maciejp.fphoto.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.maciejp.fphoto.models.UsersPhotos;

import java.util.Optional;


public interface UsersPhotosRepository extends CrudRepository<UsersPhotos, Integer> {
    @Override
    Optional<UsersPhotos> findById(Integer integer);
}
