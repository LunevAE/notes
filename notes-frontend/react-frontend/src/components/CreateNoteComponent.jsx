import React, { Component } from 'react';
import NoteService from '../services/NoteService';

class CreateNoteComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            text: ''
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeTextHandler = this.changeTextHandler.bind(this);
        this.saveNote = this.saveNote.bind(this);

    }

    componentDidMount(){
        if (this.state.id === 'create'){
            return;
        } else {
            NoteService.getNoteById(this.state.id).then((res) => {
                let note = res.data;
                this.setState({title: note.title, text: note.text});
            });
        }
    }

    saveNote = (e) => {
        e.preventDefault();
        let note = {title: this.state.title, text: this.state.text};


        if (this.state.id === 'create'){
            NoteService.createNote(note).then(res => {
                this.props.history.push('/notes');
            });
        } else {
            NoteService.updateNote(note, this.state.id).then(res => {
                this.props.history.push('/notes'); 
            });
        }
        
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeTextHandler = (event) => {
        this.setState({text: event.target.value});
    }

    cancel() {
        this.props.history.push('/notes');
    }

    getFormTitle(){
        if (this.state.id === 'create'){
            return <h3 className = "text-center">Add Note</h3>
        } else {
            return <h3 className = "text-center">Update Note</h3>
        }
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getFormTitle()
                            }
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label>Title:</label>
                                        <input placeholder = "Title" name = "title" className = "form-control"
                                            value={this.state.title} onChange={this.changeTitleHandler} />
                                    </div>
                                    <div className = "form-group">
                                        <label>Text:</label>
                                        <input placeholder = "Text" name = "text" className = "form-control"
                                            value={this.state.text} onChange={this.changeTextHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveNote}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}} >Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateNoteComponent;