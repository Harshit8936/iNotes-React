import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../contexts/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, fetchNotes,editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNotes()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const closeRef = useRef(null)
  const[note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  
  const updateHandleClick = ()=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    closeRef.current.click()
    props.showAlert("Updated !","success")
}
const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag}  onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 ||note.edescription.length<5} type="button" className="btn btn-primary" onClick={updateHandleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h1>Your notes here</h1>
        <div className="container mx-2">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes && notes.length && notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
        })}
      </div>
    </>
  )
}
