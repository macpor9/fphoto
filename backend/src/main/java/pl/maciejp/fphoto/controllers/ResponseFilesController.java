package pl.maciejp.fphoto.controllers;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.maciejp.fphoto.models.MyFile;
import pl.maciejp.fphoto.payload.response.MessageResponse;
import pl.maciejp.fphoto.repositories.FileRepository;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Optional;

@Controller
@CrossOrigin("http://localhost:8081")
@RequestMapping("/api/responseFile")
public class ResponseFilesController {

    @Autowired
    FileRepository fileRepository;

    @GetMapping("/userFiles/{id}")
    public Object getUserFiles(@PathVariable int id, HttpServletResponse response){
        Optional<MyFile> myFile = fileRepository.findById(id);
        if(myFile.isEmpty())
            return ResponseEntity.badRequest().body(new MessageResponse("File not found!"));

        try {
        String path = "files/"+myFile.get().getPath();
        File file = new File(path);
            FileInputStream fileInputStream = new FileInputStream(file);
            response.setContentType(MediaType.IMAGE_PNG_VALUE);
            IOUtils.copy(fileInputStream,response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new MessageResponse("File not found!"));
        }
        return null;
    }
}
