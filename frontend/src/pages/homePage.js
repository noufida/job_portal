
import Row from 'react-bootstrap/Row';
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import './loginpage.css'


function HomePage() {
 

  return (
   <>
      <Row >
      <NavBar/>
     
      </Row>
      <Row className='justify-content-center mt-5 pt-5' >
      <Home/>
      </Row>
 </>
  );
}

export default HomePage;