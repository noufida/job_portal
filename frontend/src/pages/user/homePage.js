import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../../components/user/NavBar'
import './loginpage.css'

import Home from '../../components/user/Home';

function HomePage() {
 

  return (
   <>
      <Row >
      <NavBar/>
     
      </Row>
      
      <Row className='justify-content-center ' >
       <Col lg={12}>        
       <Home/>
       </Col>

      </Row>
 </>
  );
}

export default HomePage;