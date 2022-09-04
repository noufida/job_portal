import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployerNav from '../../components/employer/EmployerNav';
import Dashboard from '../../components/employer/Dashboard';

function dashboardPage() {
  return (
    <div>
      <EmployerNav/>
    <Row className='mt-5 pt-5 mx-3' >
     <Dashboard/>

    </Row></div>
  )
}

export default dashboardPage