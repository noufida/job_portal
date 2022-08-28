import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useContext} from 'react'
import AuthProvider from '../context/authContext'
import { useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './login.css'

function NavScrollExample() {

 const {logoutUser} = useContext(AuthProvider)
 const navigate = useNavigate()
 
  return (
    <Navbar className='p-3' bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">seeker</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
          
          
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          <Link className='navlinks' to='/employer/register'>Employer Account</Link>
          <p className='navlinks'>|</p>
          <Link className='navlinks' to='/login'>Login</Link>
          <Link className='navlinks' to="/register">Signup</Link>
            {/*------------- user details and logout button---------- */}
            <NavDropdown className='px-5' title="user" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  onClick={logoutUser}>
                Signout
              </NavDropdown.Item>
            </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;