import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useState,useContext } from 'react';
import AuthContext from '../context/authContext';
import axios from '../axios'
import { useNavigate} from 'react-router-dom'

function EmployerReg() {
    const {authTokens} = useContext(AuthContext) 
    const navigate = useNavigate()
    
  
    const [company_name, setCompany_name] = useState('')
    const [company_email, setCompany_email] = useState('')
    const [company_website, setCompany_website] = useState('')
    const [company_mobile, setCompany_mobile] = useState('')
  
    //states for form validation
    const [company_nameErr, setCompany_nameErr] = useState({})
    const [company_websiteErr, setCompany_websiteErr] = useState({})
    const [company_emailErr, setCompany_emailErr] = useState({})
    const [company_mobileErr, setCompany_mobileErr] = useState({})
  
    //api call for employer registration
    const empRegisterHandler = async(e)=>{
      e.preventDefault()
      const isValid = formValidation()
      if (isValid){
    
     await axios.post('employer/register/',{
        company_name:company_name,
        company_email:company_email,
        company_website:company_website,
        company_mobile:company_mobile,
        
  
      },{headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data)
        if (response.status===200){
  
          console.log("success")
        }
      })  
      .catch((err)=>{
        console.log(err.response.data.detail,"erorr")
       
      }) 
    } 
    }
  
    //validation of form from frontend
    const formValidation=()=>{    
      
      const company_nameErr={}
      const company_emailErr ={}
      const company_websiteErr={}
      const company_mobileErr={}
      let isValid = true
  
      //company name validation
      if (!company_name){
        company_nameErr.short_fname = '*company name is a required field'
        isValid = false
      }
  
      // company email validation
      if (!company_email){
        company_emailErr.short_email= '*company email is a required field'
        isValid = false
      }
  
      //company mobile validation
      if (!company_mobile){
        company_mobileErr.short_mobile= '*mobile no. is a required field'
        isValid = false
      }else if(company_mobile.trim().length != 10){
        company_mobileErr.short_mobile= '*enter a valid mobile no.'
        isValid = false
      }else if( /^[a-zA-Z()]+$/.test(company_mobile)){
        company_mobileErr.short_mobile= '*enter a valid mobile no.'
        isValid = false
      }
  
      setCompany_nameErr(company_nameErr)
      setCompany_websiteErr(company_websiteErr)
      setCompany_emailErr(company_emailErr)
      setCompany_mobileErr(company_mobileErr)
  
      return isValid
    }
  
   
  
  
    return (
      <div className='box-signup'>
      <h2 style={{'textAlign':'center'}}>REGISTER YOUR COMPANY</h2><br/><br/>
      <Form onSubmit={empRegisterHandler} >
      <Form.Group className="mb-3" controlId="formFname">
        <Form.Label>Name of company</Form.Label>
        <Form.Control type="text" placeholder="Enter name of your company" value={company_name} onChange={(e)=>                
                setCompany_name(e.target.value)
                }/>
                 {Object.keys(company_nameErr).map((key)=>{
                  return <div style={{color:'red'}} >{company_nameErr[key]}</div>
                })}
      </Form.Group>
      
  
      <Form.Group className="mb-3" controlId="formLname">
        <Form.Label>Company website</Form.Label>
        <Form.Control type="text" placeholder="Enter your company website" value={company_website} onChange={(e)=>
                setCompany_website(e.target.value)
                }/>
                 {Object.keys(company_websiteErr).map((key)=>{
                  return <div style={{color:'red'}} >{company_websiteErr[key]}</div>
                })}
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Company email</Form.Label>
        <Form.Control type="email" placeholder="Enter your company email" value={company_email} onChange={(e)=>
                setCompany_email(e.target.value)
                }/>
                  {Object.keys(company_emailErr).map((key)=>{
                  return <div style={{color:'red'}} >{company_emailErr[key]}</div>
                })}
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formMobile">
        <Form.Label>Company Mobile</Form.Label>
        <Form.Control type="text" placeholder="Enter your company Mobile number" value={company_mobile} onChange={(e)=>
                setCompany_mobile(e.target.value)
                }/>
                {Object.keys(company_mobileErr).map((key)=>{
                  return <div style={{color:'red'}} >{company_mobileErr[key]}</div>
                })}
      </Form.Group>
     
  
      <div  style={{'textAlign':'center'}}>
      <Button variant="success" className='sub-button' type="submit" >
        Submit
      </Button>
      </div>
      
      </Form></div>
    );
  }
  
  export default EmployerReg;