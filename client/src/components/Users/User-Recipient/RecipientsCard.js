import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function RecipientsCard({ recipient, onDeleteRecipient }) {
  const { id, name, birthday, notes } = recipient
  const params = useParams()
  const navigate = useNavigate()



  function handleDelete() {
    fetch(`/recipient/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        onDeleteRecipient(id);
      });
  }

  function handleClick() {
    navigate(`/notes/${id}`, { state: recipient });
  };







  return (
    <li className="card" id={id}>
      <section classname="info">
        <h2>{name}</h2>
        <h2>{birthday}</h2>
        <button className="button">Edit Info</button>
        <button className="button" onClick={handleDelete}>Delete</button>
      </section>
      <section>

        <button className="button" onClick={handleClick}>Notes!</button>

      </section>

    </li>
  )
}

export default RecipientsCard