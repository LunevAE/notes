package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.domain.Note;
import org.example.backend.exception.ResourceNotFoundException;
import org.example.backend.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class NoteController {
    private final NoteService noteService;

    @GetMapping("/api/notes")
    public ResponseEntity<List<Note>> getAllNotes(){
        return new ResponseEntity<>(noteService.findAll(), HttpStatus.OK);
    }

    @PostMapping("/api/notes")
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        Note n = noteService.save(note);
        return new ResponseEntity<>(n, HttpStatus.CREATED);
    }

    @GetMapping("/api/notes/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(noteService.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note with this id does not exist: " + id)), HttpStatus.OK);
    }

    @PutMapping("/api/notes/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, @RequestBody Note note) {
        noteService.update(id, note);
        return new ResponseEntity(noteService.findById(id), HttpStatus.OK);
    }
    
    @DeleteMapping("/api/notes/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        noteService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
