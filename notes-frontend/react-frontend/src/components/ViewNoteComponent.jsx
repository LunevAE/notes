import React, { Component } from 'react';
import NoteService from '../services/NoteService';

class ViewNoteComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            note: {}
        }
    }

    componentDidMount(){
        NoteService.getNoteById(this.state.id).then( res => {
            this.setState({note: res.data});
        })
    }

    render() {
        return (
            <div>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Note Page</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Title: </label>
                            <div> { this.state.note.title }</div>
                        </div>
                        <div className = "row">
                            <label> Text: </label>
                            <div> { this.state.note.text }</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewNoteComponent;