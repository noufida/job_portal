import React,{useEffect,useContext,useState} from 'react'
import {useParams} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from '../../axios'
import AuthContext from '../../context/authContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Navigate, useNavigate} from 'react-router-dom'

function SingleJob() {
  const navigate = useNavigate()

  const {authTokens} = useContext(AuthContext)
  const [jobDetail, setJobDetail] = useState('')
  const [skill, setSkill] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate('/jobs')
  }
  const handleShow = () => setShow(true);
   

  useEffect(() => {
   
    console.log("usefeffee")
    getDetailHandler()
    skillHandler()
  }, [])
  
  //for getting id from url
  const params = useParams();
  let a=params.id

  //api call for getting details about a job
  const getDetailHandler=async()=>{
    await axios.get(`employer/jobs/${a}`,
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

  //api call for getting skills for a job
  const skillHandler=async()=>{
    await axios.get(`employer/jobs/${a}/skills`,
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"qualifications")
        if (response.status === 200) {
            console.log(response.data,"skillssss")
            setSkill(response.data)
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }

  //api call for applying for a job
  const applyHandler=async()=>{
    await axios.post(`user/apply_job/${a}/`,{},
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"qualifications")
        if (response.status === 200) {
            console.log(response.data,"job appleid")
            handleShow()
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
        
      })

  }
  return (
    <div>
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congrats!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your application was sent to { jobDetail && jobDetail.company.company_name}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col className='m-5 p-5' >
        <Card  style={{ width: '100%' }}>
          <Card.Body>
            <Card.Title>{jobDetail.designation}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{ jobDetail && jobDetail.category.job_category}</Card.Subtitle>
            <Card.Text>
            { jobDetail && jobDetail.company.company_name}
            </Card.Text>
            {
              skill.map((obj)=>
              <p>{obj.skill}</p>
              )
            }
            <Button onClick={applyHandler}>Apply</Button>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SingleJob