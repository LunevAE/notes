import axios from 'axios';

const NOTE_API_URL = "http://localhost:8080/api/notes";

class NoteService {

    getNotes() {
        return axios.get(NOTE_API_URL);
    }

    createNote(note){
        return axios.post(NOTE_API_URL, note);
    }

    getNoteById(noteId){
        return axios.get(NOTE_API_URL + '/' + noteId);
    }

    updateNote(note, noteId){
        return axios.put(NOTE_API_URL + '/' + noteId, note);
    }

    deleteNote(noteId){
        return axios.delete(NOTE_API_URL + '/' + noteId);
    }
}

export default new NoteService()