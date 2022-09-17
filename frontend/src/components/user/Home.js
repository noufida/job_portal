import React,{useState,useContext} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './home.css'
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/authContext';
import { useNavigate} from 'react-router-dom'

function Home() {
  const {authTokens} = useContext(AuthContext)

  const [search, setSearch] = useState('')
  const navigate = useNavigate()
   

  return (
    <div>
      <Row  > 
      <div className='bg ' >
        <input className='search-box' placeholder=' Search a job here...' 
        //  onKeyDown={e => e.key === 'Enter' && searchHandler()} 
        onChange={(e)=>setSearch(e.target.value)} type="text" />
        <Button onClick={()=>navigate('/jobs')} className='job_button'>Find Jobs</Button>
        </div>   
      </Row>
      <Row className='justify-contents-center'>
      <Col >
      
      </Col>
      </Row>
      {authTokens && 
      <Row className='p-5'>
        <Col className='p-5'>
        <h3>Jobs for you</h3> 
        </Col>
      </Row>}
    </div>
  )
}

export default Home