import React, { Component } from 'react';
import NoteService from '../services/NoteService';

class ListNotesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: []
        }
        this.addNote = this.addNote.bind(this);
        this.editNote = this.editNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    viewNote(id){
        this.props.history.push(`/view-note/${id}`);
    }

    deleteNote(id){
        NoteService.deleteNote(id).then( res => {
            this.setState({notes: this.state.notes.filter(note => note.id !== id)});
        });
    }

    editNote(id){
        this.props.history.push(`/add-note/${id}`);
    }

    componentDidMount(){
        NoteService.getNotes().then((res) => {
            this.setState({ notes: res.data});
        });
    }

    addNote(){
        this.props.history.push('/add-note/create');
    }
    render() {
        return (
            <div>
                <h2 className="text-center">Notes List</h2>
                <div className= "row">
                    <button className="btn btn-primary" onClick={this.addNote}>Add Note</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered"> 

                        <thead>
                            <tr>
                                <th> Title </th>
                                <th> Text </th>
                                <th> Actions </th>
                            </tr>
                        </thead>  

                        <tbody>
                            {
                                this.state.notes.map(
                                    note => 
                                    <tr key = {note.id}>
                                        <td>{note.title}</td>
                                        <td>{note.text}</td>
                                        <td>
                                            <button onClick = {() => this.editNote(note.id)} className = "btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick = {() => this.deleteNote(note.id)} className = "btn btn-danger">Delete</button>
                                            <button style={{marginLeft: "10px"}} onClick = {() => this.viewNote(note.id)} className = "btn btn-info">View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>                  
                    </table>
                </div>
            </div>
        );
    }
}

export default ListNotesComponent;