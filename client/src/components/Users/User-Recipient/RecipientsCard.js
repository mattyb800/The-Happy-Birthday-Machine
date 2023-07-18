import React, { useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import UserContext from "../../Context/UserContext";
import Button from 'react-bootstrap/Button';

function RecipientsCard({ recipient, onDeleteRecipient }) {
  const { id, name, birthday, notes } = recipient
  const params = useParams()
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext);






  function handleDelete() {
    fetch(`/recipient/${recipient.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        onDeleteRecipient(recipient);
      });
  }

  function handleClick() {
    navigate(`/notes/${recipient.id}`, { state: recipient });
  };







  return (
    <li className="card" id={id}>
      <section className="info">
        <h2>{name}</h2>
        <h2>{birthday}</h2>
        <button className="button">Edit Info</button>
        <button className="button" onClick={() => handleDelete(recipient.id)}>Delete</button>
      </section>
      <section>

        <button variant="info" onClick={handleClick}>Notes!</button>

      </section>

    </li >
  )
}

export default RecipientsCard