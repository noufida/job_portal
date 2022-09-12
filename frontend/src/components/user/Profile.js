import React,{useState,useEffect,useContext} from 'react'
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Profile() {
    const [experienced, setExperienced] = useState('')
    const [desired_job, setdesired_job] = useState('')
    const [desired_location, setDesired_location] = useState('')

    const {authTokens} = useContext(AuthContext) 
    const [category, setCategory] = useState([]) //state for job categories

    useEffect(() => {
        catHandler()
    },[])

     //api call for getting category
     const catHandler = async(e)=>{     
         
        await axios.get('employer/job_categories/',
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
           console.log(response.data)
           if (response.status===200){
             setCategory(response.data)
             console.log("success")
           }
         })  
         .catch((err)=>{
           console.log(err.response.data.detail,"error category")
        
         }) 
       
         
       }

     //api call for creating profile
     const profileHandler=async(e)=>{
        e.preventDefault()
        await axios.post('user/profile/',{
            experienced:experienced,
            desired_job:desired_job,
            desired_location:desired_location
          },{headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"ok")
           
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
            console.log(experienced,desired_job,desired_location)
            
          })

      }


  return (
    <div>        
       
      <h2 style={{'textAlign':'center'}}>COMPLETE YOUR PROFILE</h2><br/><br/>
    <Form onSubmit={profileHandler}>
     <Form.Group className="mb-3" controlId="formLname">
         <Form.Label >Select </Form.Label>

            <div onChange={(e)=>setExperienced(e.target.value)}>

            <input type="radio" value='False' name="exp" /> Fresher <br/>
            <input type="radio" value='True' name="exp" /> Experienced

            </div>

                 {/* {Object.keys(company_websiteErr).map((key)=>{
                  return <div style={{color:'red'}} >{company_websiteErr[key]}</div>
                })} */}
      </Form.Group>

     
      <Form.Group  className="mb-3">
        <Form.Label>Your desired job</Form.Label>
        <Form.Select onChange={(e)=>setdesired_job(e.target.value)}>   
                <option>CHOOSE</option>
                {category.map((obj,key)=>
             
                <option value={obj.id} >{obj.job_category}</option>
                
                )}
        </Form.Select>
                 {/* {Object.keys(company_nameErr).map((key)=>{
                  return <div style={{color:'red'}} >{company_nameErr[key]}</div>
                })} */}
      </Form.Group>
       
           
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Desired location</Form.Label>
        <Form.Control type="text" placeholder="Your desired job location"onChange={(e)=>
                setDesired_location(e.target.value)
                }/>
                  {/* {Object.keys(company_emailErr).map((key)=>{
                  return <div style={{color:'red'}} >{company_emailErr[key]}</div>
                })} */}
      </Form.Group>
     
  
      <div  style={{'textAlign':'center'}}>
      <Button variant="success" className='sub-button' type="submit" >
        Next
      </Button>
      </div>
      
      </Form>

    </div>
  )
}

export default Profile