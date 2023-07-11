import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import RecipientsContainer from './Users/User-Recipient/RecipientsContainer'
import AddRecipients from './Users/User-Recipient/AddRecipients'
import AddNotes from './Users/User-Note/AddNotes'
function Users({ user }) {

  const { username } = useParams()
  const [recipients, setRecipients] = useState([])

  useEffect(() => {
    getRecipients();
  }, [])


  console.log(user)

  function getRecipients() {
    fetch(`/users/${username}/recipients`)
      .then(response => {
        if (response.ok) {
          response.json().then(recipients => setRecipients(recipients))
        }

        else setRecipients([])
      }
      )

  }

  function updateRecipients(recipient) {
    setRecipients(recipient)
  }


  return (
    <div>
      <h1>Welcome, {username} </h1>

      <RecipientsContainer recipients={recipients} user={user} />
      <AddRecipients recipients={recipients} user={user} updaterecipients={updateRecipients} />
      <AddNotes user={user} />
    </div>
  )
}


export default Users