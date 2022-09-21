import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployerNav from '../../components/employer/EmployerNav';
import Dashboard from '../../components/employer/Dashboard';
import Button from 'react-bootstrap/Button';
import { useNavigate} from 'react-router-dom'

function DashboardPage() {
  const navigate = useNavigate()
  return (
    <div>
      <EmployerNav/>
      <Row><Col>
      <Button onClick={()=>navigate('/employer/postjob')} className='mx-5 mt-5' style={{float:'right'}}>Post New Job</Button>
      </Col></Row>
    
     <Dashboard/>

 </div>
  )
}

export default DashboardPage