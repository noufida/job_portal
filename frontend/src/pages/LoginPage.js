import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../components/NavBar'
import Login from '../components/Login'
import './loginpage.css'

function LoginPage() {
  return (
   <>
      <Row >
      <NavBar/>

      </Row>
      <Row className='justify-content-center mt-5 pt-5' >
       <Col lg={4}>
        
       <Login/>
       </Col>

      </Row>
 </>
  );
}

export default LoginPage;