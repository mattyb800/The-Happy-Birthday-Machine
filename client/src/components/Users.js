import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom"
import RecipientsContainer from './Users/User-Recipient/RecipientsContainer'
import AddRecipients from './Users/User-Recipient/AddRecipients'
import UserContext from "./Context/UserContext";
import UserForm from './UserForm'
import GiftsContainer from './Users/User-Gift/GiftsContainer'
import AddGifts from './Users/User-Gift/AddGifts'


function Users() {

  const { username } = useParams()
  const [recipients, setRecipients] = useState([])
  const [gifts, setGifts] = useState([])
  const [userForm, setUserForm] = useState(false)
  const { user, setUser } = useContext(UserContext)
  useEffect(() => {
    getRecipients();

  }, [])


  console.log(user)

  function getRecipients() {
    fetch(`/users/${user.username}/recipients`)
      .then(response => {
        console.log(response)
        if (response.ok) {
          response.json().then(data => setRecipients(data));
        }

        //else setRecipients([])
      }
      )

  }


  function updateRecipients(recipient) {
    setRecipients([...recipients, recipient])
  }

  function onDeleteRecipient(recipientToDelete) {
    const updateRecipients = recipients.filter((recipient) => recipient.id !== recipientToDelete.id);
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
      .then(setUser)
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
      <AddRecipients updateRecipients={updateRecipients} user={user} />
      <GiftsContainer gifts={gifts} user={user} />

      <AddGifts />
    </div>
  )
}


export default Users