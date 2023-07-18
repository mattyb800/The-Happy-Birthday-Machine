import React from 'react'


function GiftsCard({ gift, onDeleteGifts, handleFavorite }) {
    const { description, image, location, id } = gift


    function handleDelete() {
        fetch(`/gift/${gift.id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                onDeleteGifts(gift);
            });
    }










    return (
        <div>Gift Ideas:

            <li className="cards" id={id}>
                <h2>{description}</h2>
                <img src={image} alt={description} />
                <h2>{location}</h2>
            </li>

            <button className="button" onClick={() => handleDelete(gift.id)}>Delete</button>
        </div >
    )
}

export default GiftsCard