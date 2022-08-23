
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../components/NavBar'
import Login from '../components/Login'
import './loginpage.css'

function HomePage() {
  return (
   <>
      <Row >
      <NavBar/>

      </Row>
      <Row className='justify-content-center mt-5 pt-5' >
       <h1>my home page</h1>

      </Row>
 </>
  );
}

export default HomePage;