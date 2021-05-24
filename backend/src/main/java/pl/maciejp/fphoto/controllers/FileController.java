package pl.maciejp.fphoto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.maciejp.fphoto.payload.request.UploadFileRequest;
import pl.maciejp.fphoto.payload.response.MessageResponse;
import pl.maciejp.fphoto.repositories.FileRepository;
import pl.maciejp.fphoto.repositories.UserRepository;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@RestController
@CrossOrigin("http://localhost:8081")
@RequestMapping("/api/photo")
public class FileController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    FileRepository fileRepository;

    @PostMapping("/upload")
    @CrossOrigin("http://localhost:8081")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile requestFile, @RequestParam("name") String requestName){
        try {
            String path = "files/"+requestName+".png";
            File myFile = new File(path);
            if(!myFile.exists())
                //noinspection ResultOfMethodCallIgnored
                myFile.createNewFile();
            FileOutputStream fileOutputStream = new FileOutputStream(myFile, false);
            fileOutputStream.write(requestFile.getBytes());
            fileOutputStream.close();
            System.out.println(requestName);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(new MessageResponse("File uploaded successfully"));
    }
}
