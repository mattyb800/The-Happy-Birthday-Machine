import React from 'react'
import NotesCard from './NotesCard'



function NotesContainer({ notes }) {

  return (
    <div>Notes!
      {notes?.map(note => <NotesCard key={note.id} note={note} />)}
    </div>
  )
}

export default NotesContainer