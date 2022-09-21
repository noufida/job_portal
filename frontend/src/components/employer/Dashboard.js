import Table from 'react-bootstrap/Table';
import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import './dashboard.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard() {
    const {authTokens} = useContext(AuthContext)
    const [job, setJob] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getJobs()
    }, [])
    
    const getJobs=async(e)=>{
     
        await axios.get(`employer/${authTokens.user_id}/jobs/`,
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
           console.log(response.data)
           if (response.status===200){
             console.log("success")
             setJob(response.data)
             
           }
         })  
         .catch((err)=>{
           console.log(err.response.data.detail,"erorr")
          
         }) 
       
       }
    
  return (
    <div>
      <Row className='m-5 p-5'>
        <Col>
        <Table hover >
      <thead>
        <tr>
          <th>Sl. No.</th>
          <th >Job Title</th>
          <th>Vacancies</th>
          <th>Applicants</th>
          <th>Hired</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
       
            {
                job.map((obj,key)=>
                 <tr>
                <td>{key+1}</td>
                <td onClick={()=>navigate('/')}>{obj.designation}</td>
                <td>{obj.vacancies}</td>
                <td>{obj.applicants}</td>
                <td>{obj.hired}</td>
                {
                  obj.applicants ? <td><Button onClick={()=>navigate(`/employer/job/${obj.id}/applicants`)} className='applicants'>View applicants</Button></td>
                  : <td style={{fontStyle:'italic'}} >No applicants</td>
                }
                
                </tr>
                 )
            }
         
     
      </tbody>
       </Table>
        </Col>
      </Row>
        
   
    </div>
  )
}

export default Dashboard