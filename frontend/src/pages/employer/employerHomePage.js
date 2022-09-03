import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EmployerHome  from '../../components/employer/EmployerHome'
import './../user/loginpage.css'
import EmployerNav from '../../components/employer/EmployerNav';

function employerHomePage() {
  return (
   <>
      <EmployerNav/>
      <Row className='justify-content-center mt-5 pt-5 px-5' >
       <Col lg={12}>        
       <EmployerHome/>
       </Col>

      </Row>
 </>
  );
}

export default employerHomePage;