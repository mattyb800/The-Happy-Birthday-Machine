import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecipientsCard from './RecipientsCard'
import NotesContainer from '../User-Note/NotesContainer'

function RecipientsContainer({ recipients, user, onDeleteRecipient }) {
  const { username } = useParams()
  const [notes, setNotes] = useState({ notes: [] })

  useEffect(() => {
    getNotes()
  }, []);



  function getNotes() {
    fetch(`/users/${username}/notes`)
      .then(response => {
        if (response.ok) {
          response.json().then(notes => setNotes(notes))
        }

        else setNotes([])
      }
      )
  }


  return (
    <div>
      {recipients?.map(recipient => <RecipientsCard key={recipient.id} recipient={recipient} onDeleteRecipient={onDeleteRecipient} />)}
      <section>
        <NotesContainer />
      </section>
    </div>
  )
}

export default RecipientsContainer