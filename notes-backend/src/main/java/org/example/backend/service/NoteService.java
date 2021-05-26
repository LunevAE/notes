package org.example.backend.service;

import org.example.backend.domain.Note;

import java.util.List;
import java.util.Optional;

public interface NoteService {
    List<Note> findAll();
    Note save(Note note);
    Optional<Note> findById(Long id);
    void update(Long id, Note note);
    void delete(Long id);
}
