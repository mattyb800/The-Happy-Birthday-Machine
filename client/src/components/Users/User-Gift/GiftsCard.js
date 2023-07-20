import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import UserContext from "../../Context/UserContext";
import Button from 'react-bootstrap/Button';

function GiftsCard({ gift, onDeleteGifts, handleFavorite }) {
    const { description, image, location, id } = gift
    const { user } = useContext(UserContext)

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
            <Card style={{ width: '18rem' }}>
                <li className="cards" id={id}>
                    <Card.Title>{description}</Card.Title>
                    <Card.Img variant="top" src={image} alt={description} />
                    <Card.Text>{location}</Card.Text>

                </li>
                <Button onClick={() => handleDelete(gift.id)}>Delete</Button>
            </Card>

        </div >
    )
}

export default GiftsCard