import React,{useState,useContext,useEffect} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './home.css'
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/authContext';
import { useNavigate} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import axios from '../../axios'
import {Link} from 'react-router-dom'

function Home() {
  
  const {authTokens} = useContext(AuthContext)
  const [recJob, setRecJob] = useState([])

  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    recommJobHandler()
  }, [])
  
   
   //api call for getting jobs recommended for a user
   const recommJobHandler=async()=>{
    await axios.get('user/match_job/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"recommended jobs")
        if (response.status === 200) {
            console.log(response.data)
            setRecJob(response.data)
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

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
        <Col lg={12} className='p-5'>
        <h3>Jobs for you</h3>
      
        {
          recJob.slice(0, 3).map((obj)=>
          
          <Card   className='mt-4 mx-5' style={{ width: '20rem',float:'left'}}>
          <Card.Body>
            <Card.Title>{obj.designation}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{obj.company.company_name}</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
          )
        }
          
        
        </Col>
        <Col className='px-5'>
        <a  onClick={()=>navigate('/recommended_jobs')} style={{cursor:'pointer',textDecoration:'none',float:'right'}} className='mx-5 px-5'>VIEW ALL</a>
        </Col>
        
      </Row>}
    </div>  
  )
}

export default Home