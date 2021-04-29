package pl.maciejp.fphoto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.maciejp.fphoto.payload.request.UploadFileRequest;
import pl.maciejp.fphoto.payload.response.MessageResponse;
import pl.maciejp.fphoto.repositories.FileRepository;
import pl.maciejp.fphoto.repositories.UserRepository;

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
    public ResponseEntity<?> uploadFile(@ModelAttribute UploadFileRequest uploadFileRequest){
        return ResponseEntity.ok(new MessageResponse("File uploaded successfully"));
    }


}
