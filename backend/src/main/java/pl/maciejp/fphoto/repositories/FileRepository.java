package pl.maciejp.fphoto.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.maciejp.fphoto.models.MyFile;

import java.util.List;

public interface FileRepository extends CrudRepository<MyFile, Integer> {
    List<MyFile> findById(int id);
}
