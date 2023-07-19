import React, { useContext } from 'react';
import { useNavigate, Link, NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import UserContext from "./Context/UserContext";


function Navigation({ updateUser }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function handleLogOut() {
    fetch('/logout')
      .then((response) => {
        if (response.ok) {
          updateUser(null);
          navigate('/app');
        }
      });
  }
  if (!user) {
    return (
      <Nav className='access'>
        <div>
          {/*<NavLink className='button' exact to='/'>App!</NavLink>*/}
          <NavLink className='button' exact to="/signup"> Sign Up! </NavLink>

          <NavLink className="button" exact to="/login"> Log In! </NavLink>
        </div>
      </Nav>

    )
  }


  return (
    <header className="nav">
      <Navbar className="bg-body-tertiary" variant='pills' activeKey="/home" >
        <Container className="justify-content-center">
          <div >

            <h2>Navigation</h2>

            <Nav>

              <Nav.Link href="/home" >Home!</Nav.Link>


              <Nav.Link href={`/users/${user.username}`}> User Portal! </Nav.Link>
              {user ?
                (<>
                  <Button size="sm" variant="outline-dark" onClick={handleLogOut} className="button" >
                    Log Out!
                  </Button>
                </>) :
                ''}

            </Nav>

          </div>
        </Container>
      </Navbar >
    </header>
  )
}

export default Navigation