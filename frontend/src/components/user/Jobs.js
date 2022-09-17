import React,{useEffect,useContext,useState} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import AuthContext from '../../context/authContext';
import JobContext from "../../context/jobContext";
import axios from '../../axios'
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate} from 'react-router-dom'

function Jobs() {
    const navigate = useNavigate()
    
    const [jobDetail, setJobDetail] = useState('')
    const [search, setSearch] = useState('')
    const [found, setFound] = useState(0)

    const {authTokens} = useContext(AuthContext)
    const {getJobHandler,job,setJob} = useContext(JobContext)

        useEffect(() => {
        getJobHandler()
        console.log("kk")
        
    }, [])
    
     //api call for getting details about a job
     const getDetailHandler=async(id)=>{
        await axios.get(`employer/jobs/${id}`,
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"qualifications")
            if (response.status === 200) {
                console.log(response.data,"dhgtfhrjyhyjtd")
                setJobDetail(response.data)
            }
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
            
          })
  
      }

      //api call for search
     const searchHandler=async()=>{
        await axios.get('employer/job_/?search=',{params:{search:search}},
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"qualifications")
            if (response.status === 200) {
                console.log(response.data,"search result")
                setJob(response.data)
                setFound(response.data.length)
            }
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
            
          })
  
      }


  return (
    <div>
        <Row className='p-5'>
            <Col  lg={10} >
            <input onKeyDown={e => e.key === 'Enter' && searchHandler()} 
        onChange={(e)=>setSearch(e.target.value)} type="text"
        style={{width:'100%', marginRight:'20px',height:'100%'}}
        placeholder=' Search for a job or place...' />
        
            </Col>
            <Col  lg={2}>
            <Button style={{width:'100%',height:'100%',backgroundColor:'grey',border:'none'}}  onClick={searchHandler} >Search</Button>
            </Col>
        </Row>
     
    
        
        <Row className='p-5'>
            <Col sm={12} lg={7}>
             { 
                    job.map((obj)=>
                    <Card onClick={()=>getDetailHandler(obj.id)} style={{marginBottom:'10px',backgroundColor:''}} > 
            <Card.Body>
                <Card.Title>{obj.designation[0].toUpperCase() + obj.designation.slice(1).toLowerCase()} </Card.Title>
                <Card.Subtitle  className="mb-2 text-muted">{obj.category.job_category.toUpperCase()}</Card.Subtitle>
                <Card.Text>
                {obj.location}
                </Card.Text>
                <Card.Text>
                {obj.company.company_name}
                </Card.Text>
                <Badge bg="secondary">PAYSCALE FROM {obj.payscale_from}LPA TO {obj.payscale_to}LPA</Badge>
                {' '}<Badge bg="secondary">{obj.type}</Badge>
                {' '}<br/><Badge bg="secondary">{obj.workmode}</Badge>

            </Card.Body>
            </Card>
                    )
                }
            
          
            </Col>
            <Col className="d-none d-lg-block" lg={5}>
            <Card >
            <Card.Body onClick={()=>navigate(`/jobs/${jobDetail.id}`)} >
                <Card.Title>{jobDetail.designation}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                {jobDetail.job_description}
                </Card.Text>
                <Button onClick={()=>navigate(`/jobs/${jobDetail.id}`)}>Apply Now</Button>{' '}
                <Button>W</Button>
            </Card.Body>
            </Card> 
          
            </Col>

        </Row>
    </div>
  )
}

export default Jobs