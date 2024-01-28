import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const notesInitial = []
    const[notes,setNotes] = useState(notesInitial);

     // Get all notes
     const fetchNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
        });
        const json = await response.json();
        setNotes(json.data)
    }

    // Add a note
    const addNote = async (title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
              body: JSON.stringify({title,description,tag}),
        });
        const json = await response.json();
        setNotes(notes.concat(json.data))
    }

    // Delete a note
    const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
        });
        const json = await response.json();
            const newNotes = notes.filter((json)=>{return json._id!==id})
            setNotes(newNotes)
    }

    // Edit a note
    const editNote = async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
              body: JSON.stringify({title,description,tag}),
        });
        const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    


    return (
        <NoteContext.Provider value={{notes,fetchNotes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

// const NoteState = (props)=>{
//     const s1 = {
//         "name":"Harshit",
//         "class":"7c"
//     }
//     const[state,setState] = useState(s1);
//     const update = ()=>{
//         setTimeout(() => {
//             setState({
//                 "name":"Bhargav",
//                 "class":"11b"
//             })
//         }, 1000);
//     }

//     return (
//         <NoteContext.Provider value={{state,update}}>
//             {props.children}
//         </NoteContext.Provider>
//     )
// }

export default NoteState


