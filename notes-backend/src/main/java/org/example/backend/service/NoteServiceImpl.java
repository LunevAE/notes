package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.domain.Note;
import org.example.backend.exception.ResourceNotFoundException;
import org.example.backend.repository.NoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {
    private final NoteRepository noteRepository;

    @Override
    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    @Transactional
    @Override
    public Note save(Note note) {
        return noteRepository.save(Note.builder()
                .id(note.getId())
                .title(note.getTitle())
                .text(note.getText())
                .build());
    }

    public void update(Long id, Note note){
        Note noteFromDb = noteRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Note with this id does not exist: " + id));
        noteFromDb.setTitle(note.getTitle());
        noteFromDb.setText(note.getText());
        noteRepository.save(noteFromDb);
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Note> findById(Long id) {
        return noteRepository.findById(id);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        noteRepository.deleteById(id);
    }
}
