import React, { useContext } from 'react'
import UserContext from "../../Context/UserContext";
import RecipientsCard from './RecipientsCard'


function RecipientsContainer({ recipients, onDeleteRecipient }) {
  const { user, setUser } = useContext(UserContext);





  console.log(recipients)

  const mappedRecipients = recipients.map((recipient) => (
    <RecipientsCard
      key={recipient.id}
      recipient={recipient}
      onDeleteRecipient={onDeleteRecipient}
    />
  ));


  return (
    <div>
      {mappedRecipients}
      <section>

      </section>
    </div>
  )
}

export default RecipientsContainer