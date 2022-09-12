import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../../components/user/NavBar'


function splitPage() {
  return (
    <div>
        <Row >
      <NavBar/>     
      </Row>
        <h1>Employee</h1><br/>
        <h1>Employer</h1>
    </div>
  )
}

export default splitPage