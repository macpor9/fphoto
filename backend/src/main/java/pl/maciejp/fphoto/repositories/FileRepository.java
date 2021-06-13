package pl.maciejp.fphoto.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.maciejp.fphoto.models.MyFile;

import java.util.List;
import java.util.Optional;

public interface FileRepository extends CrudRepository<MyFile, Integer> {
    List<MyFile> findAllById(int id);
    Optional<MyFile> findById(int id);



    boolean existsByName(String name);
    boolean existsByPath(String path);
    boolean existsByNameAndUser_Id(String name, int id);
    List<MyFile> findByUser_Id(int id);
}
