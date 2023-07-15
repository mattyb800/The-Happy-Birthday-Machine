import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from './SignUp'
import LogIn from './LogIn'
import Navigation from './Navigation'
import Users from './Users'
import AddRecipients from './Users/User-Recipient/AddRecipients'
import RecipientNotes from './Users/User-Recipient/RecipientNotes'
function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {

    if (!user) {
      fetch('/authorize_session')
        .then(response => {
          if (response.ok) {
            response.json().then((user) => setUser(user))
          }

          else { setUser(null) }
        }
        )
    }
  }, []);





  function updateUser(user) {
    setUser(user)
  }

  return (
    <div>
      <h1>The Happy Birthday Machine</h1>
      <Navigation user={user} updateUser={updateUser} />

      <Routes>
        <Route path='/users/:username' element={<Users updateUser={updateUser} user={user} />} />
        <Route path='/users/:username/addrecipients' element={<AddRecipients />} />
        <Route path='/app' element={<App />} />
        <Route path='/signup' element={<SignUp updateUser={updateUser} />} />
        <Route path='/login' element={<LogIn updateUser={updateUser} />} />
        <Route path='/notes/:recipient_id' element={<RecipientNotes />} />
      </Routes>
    </div>
  )
}

export default App;
