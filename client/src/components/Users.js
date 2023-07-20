import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import RecipientsContainer from './Users/User-Recipient/RecipientsContainer'
import AddRecipients from './Users/User-Recipient/AddRecipients'
import UserContext from "./Context/UserContext";
import UserForm from './UserForm'
import Button from 'react-bootstrap/Button';
import cake from '../CAKE2.PNG';


function Users() {

  const navigate = useNavigate()
  const [recipients, setRecipients] = useState([])
  const { username } = useParams()
  const [userForm, setUserForm] = useState(false)
  const { user, setUser } = useContext(UserContext)
  useEffect(() => {

    getRecipients();

  }, [])


  console.log(user)

  function getRecipients() {
    fetch(`/users/${username}/recipients`)
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


  function handleUserForm() {
    setUserForm((userForm) => !userForm)
  }
  function handleClick() {
    navigate(`/gifts`);
  };


  console.log(user)


  return (
    <div>

      <h1>Welcome, {username}
        {userForm ? <UserForm /> : null}
        <Button size="sm" variant="outline-dark" onClick={handleClick}>Gifts!</Button>
        <Button size="sm" variant="outline-dark" onClick={handleUserForm}>{userForm ? "Hide Form" : "Edit User Info"} </Button>
      </h1>
      <RecipientsContainer recipients={recipients} user={user} onDeleteRecipient={onDeleteRecipient} />
      <AddRecipients updateRecipients={updateRecipients} user={user} />

      <img style={{ width: 500, height: 600 }} src={cake} alt="cake"></img>

    </div>
  )
}


export default Users