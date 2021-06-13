package pl.maciejp.fphoto.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
//@NoArgsConstructor
@Entity
@Table(name="users_photos")
public class UsersPhotos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;
    @Column(name = "photo_id")
    private int photoId;
}
