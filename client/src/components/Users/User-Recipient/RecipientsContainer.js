import React from 'react'
import { useParams } from 'react-router-dom'
import RecipientsCard from './RecipientsCard'


function RecipientsContainer({ recipients, user, onDeleteRecipient }) {
  const { username } = useParams()





  console.log(recipients)



  return (
    <div>
      {recipients?.map(recipient => <RecipientsCard key={recipient.id} recipient={recipient} onDeleteRecipient={onDeleteRecipient} />)}
      <section>

      </section>
    </div>
  )
}

export default RecipientsContainer