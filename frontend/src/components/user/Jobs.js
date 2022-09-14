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
    const {authTokens} = useContext(AuthContext)
    const {getJobHandler,job} = useContext(JobContext)

        useEffect(() => {
        getJobHandler()
        
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
       
  return (
    <div>
        <Row className='p-5'>
            <Col  lg={7}>
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

            </Card.Body>
            </Card>
                    )
                }
            
          
            </Col>
            <Col lg={5}>
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