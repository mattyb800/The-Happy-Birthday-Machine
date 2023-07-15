import React from 'react'
import { useParams } from 'react-router-dom'
import GiftsCard from './GiftsCard'


function GiftsContainer({ gifts, user, onDeleteRecipient }) {
    const { username } = useParams()









    return (
        <div>
            {gifts?.map(gift => <GiftsCard key={gift.id} gift={gift} onDeleteRecipient={onDeleteRecipient} />)}
            <section>

            </section>
        </div>
    )
}

export default GiftsContainer