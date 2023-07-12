import React from 'react'
import { useNavigate, NavLink } from "react-router-dom"

function Navigation({ user, updateUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    fetch('/logout')
      .then((response) => {
        if (response.ok) {
          updateUser(null);
          navigate('/');
        }
      });
  }
  if (!user) {
    return (
      <div>
        <NavLink className='button' exact to='/app'>Home!</NavLink>
        <NavLink className='button' exact to="/signup"> Sign Up! </NavLink>

        <NavLink className="button" exact to="/login"> Log In! </NavLink>
      </div>
    )
  }


  return (
    <header>
      <div>Navigation


        <NavLink className='button' exact to='/app'>Home!</NavLink>
        {/*<NavLink className='button' exact to="/signup"> Sign Up! </NavLink>

  <NavLink className="button" exact to="/login"> Log In! </NavLink>*/}

        <NavLink className="button" exact to={`/users/${user?.username}`}> User Portal! </NavLink>
        {user ?
          (<>
            <button onClick={handleLogOut} className="button" >
              Log Out!
            </button>
          </>) :
          ''}


      </div>
    </header>
  )
}

export default Navigation