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
      
    
            
       <Home/>
     

 
 </>
  );
}

export default HomePage;