import React, { useContext } from 'react'
import UserContext from './Context/UserContext';
import robot from '../Robot.png';

function Home() {
    const { user } = useContext(UserContext);

    console.log(user)

    return (
        <div className="home">
            <h1>Let's Party!</h1>
            <img style={{ width: 500, height: 600 }} src={robot} alt="robot"></img>
        </div >


    )
}

export default Home