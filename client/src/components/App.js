import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from './SignUp';
import LogIn from './LogIn';
import Navigation from './Navigation';
import Users from './Users';
import GiftsContainer from './Users/User-Gift/GiftsContainer';
import RecipientNotes from './Users/User-Recipient/RecipientNotes';
import UserContext from './Context/UserContext';


function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {


    fetch('/authorize_session')
      .then(response => {
        if (response.ok) {
          response.json().then((user) => setUser(user))

        }

        else { setUser(null) }
      }
      )

  }, []);









  function updateUser(user) {
    setUser(user)
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <h1>The Happy Birthday Machine</h1>
        <Navigation user={user} updateUser={updateUser} />

        <Routes>
          <Route path='/users/:username' element={<Users updateUser={updateUser} user={user} />} />
          <Route path='/gifts' element={<GiftsContainer />} />
          <Route path='/app' element={<App />} />
          <Route path='/signup' element={<SignUp updateUser={updateUser} />} />
          <Route path='/login' element={<LogIn updateUser={updateUser} />} />
          <Route path='/notes/:recipient_id' element={<RecipientNotes />} />
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App;
