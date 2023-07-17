import React, { useState } from 'react'

function GiftSearch({ search, handleSearch }) {








    return (
        <div className="searchbar">
            <label htmlFor="search">Search Gifts:</label>
            <input
                value={search}
                type="text"
                id="search"
                placeholder="I might know the perfect gift..."
                onChange={handleSearch}
            />
        </div>
    )
}

export default GiftSearch