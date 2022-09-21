import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from '../../axios'
import AuthContext from '../../context/authContext';
import Button from 'react-bootstrap/Button';
function RecJob() {
    const {authTokens} = useContext(AuthContext)

    const [recJob, setRecJob] = useState([])

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
        <Row>
            <div style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            height:'90px',
            width:'100%',
            display:'flex',
            justifyContent:'center',
            textAlign:'center',}}>
                Recommended jobs for you
            </div>
        </Row>
        <Row className='p-5'>
            <Col className='p-5' lg={12}>
                {
                    recJob.map((obj)=>
                    <Card className='m-5'>
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
        </Row>
        
    </div>
  )
}

export default RecJob