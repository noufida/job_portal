import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../components/NavBar'
import Register from '../components/Register'
import './loginpage.css'

function RegisterPage() {
  return (
   <>
      <Row >
      <NavBar/>

      </Row>
      <Row className='justify-content-center mt-5 pt-5' >
       <Col lg={4}>
        
       <Register/>
       </Col>

      </Row>
 </>
  );
}

export default RegisterPage;