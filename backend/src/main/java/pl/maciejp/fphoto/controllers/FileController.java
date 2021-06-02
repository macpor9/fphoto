package pl.maciejp.fphoto.controllers;

import com.sun.xml.bind.v2.runtime.output.SAXOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.maciejp.fphoto.models.MyFile;
import pl.maciejp.fphoto.models.User;
import pl.maciejp.fphoto.payload.request.UploadFileRequest;
import pl.maciejp.fphoto.payload.response.MessageResponse;
import pl.maciejp.fphoto.repositories.FileRepository;
import pl.maciejp.fphoto.repositories.UserRepository;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

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
    @PreAuthorize("hasRole('ROLE_ANONYMOUS')")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile requestFile, @RequestParam("name") String requestName){
        String photoName = requestName;

        getUserFromHeader();
//        User user = getUserFromHeader();
//        System.out.println(user.getId());
//        System.out.println(user.getUsername());
        try {
            int i=1;
            while (fileRepository.existsByName(photoName)){
                photoName = requestName + "(" + i + ")";
                System.out.println(photoName);
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
            System.out.println(requestName);
            fileRepository.save(new MyFile(photoName, uuid.toString()));

        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(new MessageResponse("File uploaded successfully"));
    }

    private void getUserFromHeader(){
        Authentication principal = SecurityContextHolder.getContext().getAuthentication();

//        System.out.println(principal.toString());
//        System.out.println(principal.getDetails().toString());
//        System.out.println(((UserDetails)principal).getUsername());
    }

//    private User getUserFromHeader() {
//        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
//        System.out.println(SecurityContextHolder.getContext());
//        UserDetails userDetails =
//                (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        return userRepository.findByUsername(userDetails.getUsername()).get();
//    }
}
