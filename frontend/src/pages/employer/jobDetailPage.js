import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployerNav from '../../components/employer/EmployerNav';
import JobDetail from '../../components/employer/JobDetail';

function jobDetailPage() {
  return (
    <div>
        <EmployerNav/>
      <Row className='mt-5 pt-5 mx-2' >
       <Col lg={12}> 
       <JobDetail/>
       </Col>

      </Row>
    </div>
  )
}

export default jobDetailPage