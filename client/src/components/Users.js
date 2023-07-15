import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import RecipientsContainer from './Users/User-Recipient/RecipientsContainer'
import AddRecipients from './Users/User-Recipient/AddRecipients'

import UserForm from './UserForm'
import GiftsContainer from './Users/User-Gift/GiftsContainer'
import AddGifts from './Users/User-Gift/AddGifts'


function Users({ user, updateUser }) {

  const { username } = useParams()
  const [recipients, setRecipients] = useState([])
  const [gifts, setGifts] = useState([])
  const [userForm, setUserForm] = useState(false)
  useEffect(() => {
    getRecipients();
    getGifts();
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
  function getGifts() {
    fetch(`/users/${username}/gifts`)
      .then(response => {
        if (response.ok) {
          response.json().then(gifts => setGifts(gifts))
        }

        else setGifts([])
      }
      )

  }

  function updateRecipients(recipient) {
    setRecipients([...recipients, recipient])
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
      <GiftsContainer gifts={gifts} user={user} />

      <AddGifts />
    </div>
  )
}


export default Users