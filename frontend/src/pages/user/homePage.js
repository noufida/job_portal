import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../../components/user/NavBar'
import './loginpage.css'
import homeimage from '../../image/jobseek1.jpg'
import Home from '../../components/user/Home';

function HomePage() {
 

  return (
   <>
      <Row >
      <NavBar/>
     
      </Row>
      <Row className='justify-content-center ' > 
      <img style={{height:'40rem'}} src={homeimage} />   
      </Row>
      <Row className='justify-content-center mt-5 pt-5' >
       <Col lg={12}>        
       <Home/>
       </Col>

      </Row>
 </>
  );
}

export default HomePage;