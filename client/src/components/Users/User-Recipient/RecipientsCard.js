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
      <section className="friend-info">
        <h2>{name}</h2>
        <h2>{birthday}</h2>

        <Button size="sm" variant="outline-dark" onClick={() => handleDelete(recipient.id)}>Delete</Button>
      </section>
      <section>

        <Button size="sm" variant="outline-dark" onClick={handleClick}>Notes!</Button>

      </section>

    </li >
  )
}

export default RecipientsCard