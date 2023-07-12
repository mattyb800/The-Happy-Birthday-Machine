import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import RecipientsContainer from './Users/User-Recipient/RecipientsContainer'
import AddRecipients from './Users/User-Recipient/AddRecipients'
import AddNotes from './Users/User-Note/AddNotes'
import UserForm from './UserForm'


function Users({ user, updateUser }) {

  const { username } = useParams()
  const [recipients, setRecipients] = useState([])
  const [userForm, setUserForm] = useState(false)
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

  function onDeleteRecipient(id) {
    const updateRecipients = recipients.filter((recipient) => recipient.id !== id);
    setRecipients(updateRecipients)
  }

  function editUser() {
    const user = {
      name: '',
      username: '',
      password: '',
      email: ''
    }
    fetch(`/users/${username}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then(updateUser)
  }
  function handleUserForm() {
    setUserForm((userForm) => !userForm)
  }



  return (
    <div>

      <h1>Welcome, {username}
        {userForm ? <UserForm editUser={editUser} /> : null}
        <button className="button" onClick={handleUserForm}>{userForm ? "Hide Form" : "Edit User Info"} </button>
      </h1>
      <RecipientsContainer recipients={recipients} user={user} onDeleteRecipient={onDeleteRecipient} />
      <AddRecipients recipients={recipients} user={user} updateRecipients={updateRecipients} />
      <AddNotes user={user} />
    </div>
  )
}


export default Users