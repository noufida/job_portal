import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useContext} from 'react'
import AuthProvider from '../../context/authContext'
import { useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './navbar.css'
import AuthContext from '../../context/authContext';

function NavScrollExample() {
  const {authTokens} = useContext(AuthContext)

 const {logoutUser} = useContext(AuthProvider)
 const navigate = useNavigate()
 
  return (
    <Navbar className='navbar p-3'  expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">seeker</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
          </Nav>
         {/* <Link  className='navlinks' to='/employer/register'>Employer Account</Link> */}
         
         
          
            {/*------------- user details and logout button---------- */}
            { authTokens ? (
              <>
              <Link className='navlinks' to='/'>Post Jobs</Link>
            <NavDropdown  className='navlinks px-5'  title="user" id="navbarScrollingDropdown">
              <NavDropdown.Item   href="#action3">Profile</NavDropdown.Item>
              <NavDropdown.Item  href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  onClick={logoutUser}>
                Signout
              </NavDropdown.Item>
            </NavDropdown></>):
            <>
          
            <Link className='navlinks' to='/login'>Login</Link>
          <p className='navlinks'>|</p>
          <Link className='navlinks' to="/register">Signup</Link>
            </>
            }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;