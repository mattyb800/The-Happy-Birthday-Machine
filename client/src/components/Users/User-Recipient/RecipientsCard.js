import React from 'react'

function RecipientsCard({ recipient }) {
  const { id, name, birthday } = recipient
  return (
    <li className="card" id={id}>
      <section classname="info">
        <h2>{name}</h2>
        <h2>{birthday}</h2>
      </section>
    </li>
  )
}

export default RecipientsCard