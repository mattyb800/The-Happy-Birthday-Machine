import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GiftsCard from './GiftsCard';
import AddGifts from './AddGifts';
import UserContext from "../../Context/UserContext";
import GiftSearch from "./GiftSearch";

function GiftsContainer() {
    const { username } = useParams()
    const { user, setUser } = useContext(UserContext)
    const [gifts, setGifts] = useState([])
    const [search, setSearch] = useState('')
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        getGifts();
    }, []);


    function getGifts() {
        fetch(`/users/${user.username}/gifts`)
            .then(response => {
                if (response.ok) {
                    response.json().then(gifts => setGifts(gifts))
                }

                else setGifts([])
            }
            )

    }

    function handleSearch(e) {
        setSearch(e.target.value);
    }


    const filteredGifts = search.length > 0
        ? [...gifts].filter((gift) => {
            return gift.description.toLowerCase().includes(search.toLowerCase());
        }) : []



    function updateGifts(gift) {
        setGifts([...gifts, gift])
    }
    function onDeleteGifts(giftToDelete) {
        const updateGifts = gifts.filter((gift) => gift.id !== giftToDelete.id);
        setGifts(updateGifts);
    }

    function handleFavorite(e) {
        setFavorites(e.target.value);

    }




    return (
        <div>
            <GiftSearch search={search} handleSearch={handleSearch} />
            {filteredGifts?.map(gift => <GiftsCard key={gift.id} gift={gift} onDeleteGifts={onDeleteGifts} handleFavorite={handleFavorite} />)}
            <AddGifts updateGifts={updateGifts} />
            <section>

            </section>
        </div>
    )
}

export default GiftsContainer