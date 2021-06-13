package pl.maciejp.fphoto.models;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "photos")
public class MyFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private String name;

    @Column
    private String path;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "users_photos",
            joinColumns = @JoinColumn(name = "photo_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private User user;

    public MyFile(String name, String path, User user) {
        this.name = name;
        this.path = path;
        this.user = user;
    }
}
