import React from 'react'

function GiftsCard({ gift }) {
    const { description } = gift
    return (
        <div>GiftsCard
            <li className="gifts">
                <h2>{description}</h2>
            </li>
        </div>
    )
}

export default GiftsCard