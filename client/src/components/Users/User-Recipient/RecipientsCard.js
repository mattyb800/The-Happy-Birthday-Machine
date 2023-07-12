import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function RecipientsCard({ recipient, onDeleteRecipient }) {
  const { id, name, birthday } = recipient


  function handleDelete() {
    fetch(`/recipient/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        onDeleteRecipient(id);
      });
  }




  return (
    <li className="card" id={id}>
      <section classname="info">
        <h2>{name}</h2>
        <h2>{birthday}</h2>
        <button className="button">Edit Info</button>
        <button className="button" onClick={handleDelete}>Delete</button>
      </section>

    </li>
  )
}

export default RecipientsCard