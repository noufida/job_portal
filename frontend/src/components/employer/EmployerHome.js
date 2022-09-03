import Button from 'react-bootstrap/Button';
import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import jobseek from '../../images/jobseek2.jpg'
import './emphome.css'

function EmployerHome() {
  return (
    <div>
      <Row>
        <Col lg={6} >
          <h1>Hire the right person for your Business</h1>
          <Button>Post a job</Button>
        </Col>
        <Col lg={6} >
          <img className='imagehome' src={jobseek}/>
        </Col>
      </Row>
    </div>
  )
}

export default EmployerHome