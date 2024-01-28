import React, { useContext } from 'react';
import noteContext from '../contexts/notes/noteContext';



export default function Noteitem(props) {
    const context = useContext(noteContext);
    const { editNote, deleteNote } = context;
    const { note,updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex align-items-center">
                        <button className="btn btn-primary mx-2" onClick={() => { updateNote(note) }}>Edit</button>
                        <button className="btn btn-secondary mx-2" onClick={() => { deleteNote(note._id);props.showAlert("Deleted !","success") }}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
