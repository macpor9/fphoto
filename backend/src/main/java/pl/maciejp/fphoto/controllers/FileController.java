package pl.maciejp.fphoto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.maciejp.fphoto.models.MyFile;
import pl.maciejp.fphoto.models.User;
import pl.maciejp.fphoto.payload.response.MessageResponse;
import pl.maciejp.fphoto.repositories.FileRepository;
import pl.maciejp.fphoto.repositories.UserRepository;
import pl.maciejp.fphoto.repositories.UsersPhotosRepository;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:8081")
@RequestMapping("/api/photo")
public class FileController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    FileRepository fileRepository;

    @Autowired
    UsersPhotosRepository usersPhotosRepository;

    @PostMapping("/upload")
    @CrossOrigin("http://localhost:8081")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile requestFile, @RequestParam("name") String requestName){
        String photoName = requestName;
        User user = getUserFromHeader();

        try {
            int i=1;
            while (fileRepository.existsByNameAndUser_Id(photoName, user.getId())){
                photoName = requestName + "(" + i + ")";
                i++;
            }
            UUID uuid = UUID.randomUUID();
            String path = "files/"+uuid.toString();
            File myFile = new File(path);
            if(!myFile.exists())
                myFile.createNewFile();
            FileOutputStream fileOutputStream = new FileOutputStream(myFile, false);
            fileOutputStream.write(requestFile.getBytes());
            fileOutputStream.close();

            fileRepository.save(new MyFile(photoName, uuid.toString(),user));

        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(new MessageResponse("File uploaded successfully"));
    }
//
//    @PutMapping("/upload/{id}")
//    public Object updatePhoto(@PathVariable int id, @RequestParam("file") String requestFile){
//        try {
//            byte[] decodedBytes = Base64.getDecoder().decode(requestFile);
//            Optional<MyFile> myFileOptional = fileRepository.findById(id);
//            if(myFileOptional.isEmpty())
//                return ResponseEntity.badRequest().body(new MessageResponse("File with id " + id + " not found!"));
//            String path = "files/"+myFileOptional.get().getPath();
//            File myFile = new File(path);
//            FileOutputStream fileOutputStream = new FileOutputStream(myFile, false);
//            fileOutputStream.write(decodedBytes);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return ResponseEntity.ok(new MessageResponse("File updates successfully"));
//    }
    @PutMapping("/upload/{id}")
    public Object updatePhoto(@PathVariable int id, @RequestParam("file") MultipartFile requestFile){
        try {
            Optional<MyFile> myFileOptional = fileRepository.findById(id);
            if(myFileOptional.isEmpty())
                return ResponseEntity.badRequest().body(new MessageResponse("File with id " + id + " not found!"));
            String path = "files/"+myFileOptional.get().getPath();
            File myFile = new File(path);
            FileOutputStream fileOutputStream = new FileOutputStream(myFile, false);
            fileOutputStream.write(requestFile.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(new MessageResponse("File updates successfully"));
    }

    @GetMapping("/userPhotos")
    public Object getUserFiles(){
        User user = getUserFromHeader();
        List<MyFile> files = fileRepository.findByUser_Id(user.getId());

        if(files.size() == 0)
            return ResponseEntity.ok("files not found");

        return files;
    }


    private User getUserFromHeader() {
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        System.out.println(SecurityContextHolder.getContext());
        UserDetails userDetails =
                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(userDetails.getUsername()).get();
    }
}
